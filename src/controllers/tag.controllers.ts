import { Request, Response } from 'express';
import { QueryParams } from '../types/types';
import { formatDiacritics, formatTime, totalPage } from '../utils/helper';
import { Op } from 'sequelize';
import { Tag } from '../models/tag.model';
import { User } from '../models/user.model';
import { History } from '../models/history.model';

class TagController {
  async getTags(req: Request, res: Response) {
    const { page, search, offset } = req.query;
    const limit = Number(offset) ? Number(offset) : 10;
    const skip = (page ? Number(page) - 1 : 0) * limit;
    let query = {} as QueryParams;
    try {
      if (search) {
        query = {
          [Op.or]: [
            {
              name: {
                [Op.like]: `%${search}%`,
              },
            },
            {
              slug: {
                [Op.like]: `%${formatDiacritics(search as string)}%`,
              },
            },
          ],
        };
      }
      const { rows, count } = await Tag.findAndCountAll({
        where: query,
        offset: skip,
        limit: limit,
      });
      return res
        .status(200)
        .json({ tags: rows, totalPage: totalPage(count, limit) });
    } catch (error: any) {
      return res.status(500).json({ message: error?.message });
    }
  }
  async createTag(req: Request, res: Response) {
    const user = (req as any)?.decoded as User;
    const { name } = req.body;
    try {
      const existedTag = await Tag.findOne({
        where: {
          name: name,
        },
      });
      if (existedTag)
        return res.status(409).json({ message: 'Nhãn đã tồn tại!' });
      const createdTag = await Tag.create({
        name: name,
        slug: formatDiacritics(name),
        created_at: formatTime(new Date().toString()),
        updated_at: formatTime(new Date().toString()),
      });
      if (createdTag) {
        await History.create({
          action: 'Tạo',
          userId: user?.user_id,
          target_id: createdTag.tag_id,
          details: `UserId:${user?.user_id} đã tạo nhãn Id:${createdTag.tag_id}`,
          created_at: formatTime(new Date().toString()),
        });
        return res.status(200).json({ message: 'Tạo nhãn thành công!' });
      }
    } catch (error: any) {
      return res.status(500).json({ message: error?.message });
    }
  }
  async updateTag(req: Request, res: Response) {
    const user = (req as any)?.decoded as User;
    const { name } = req.body;
    const { id } = req.params;
    try {
      const updatedTag = await Tag.update(
        {
          name: name,
          slug: formatDiacritics(name),
          updated_at: formatTime(new Date().toString()),
        },
        {
          where: {
            tag_id: id,
          },
        }
      );
      if (updatedTag[0]) {
        await History.create({
          action: 'Cập nhật',
          userId: user?.user_id,
          target_id: Number(id),
          details: `UserId:${user?.user_id} đã cập nhật nhãn Id:${id}`,
          created_at: formatTime(new Date().toString()),
        });
        return res.status(200).json({ message: 'Cập nhật nhãn thành công!' });
      }
    } catch (error: any) {
      return res.status(500).json({ message: error?.message });
    }
  }
  async deleteTag(req: Request, res: Response) {
    const user = (req as any)?.decoded as User;
    const { id } = req.params;
    try {
      const deletedTag = await Tag.destroy({
        where: {
          tag_id: id,
        },
      });
      if (deletedTag) {
        await History.create({
          action: 'Xóa',
          userId: user?.user_id,
          target_id: Number(id),
          details: `UserId:${user?.user_id} đã xóa nhãn Id:${id}`,
          created_at: formatTime(new Date().toString()),
        });
        return res.status(200).json({ message: 'Xóa nhãn thành công!' });
      }
      return res.status(404).json({ message: 'Không tìm thấy bản ghi!' });
    } catch (error: any) {
      return res.status(500).json({ message: error?.message });
    }
  }
}

export default new TagController();
