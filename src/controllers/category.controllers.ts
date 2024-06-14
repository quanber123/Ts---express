import { Request, Response } from 'express';
import { Category } from './../models/category.model';
import { formatDiacritics, totalPage } from '../utils/helper';
import { Op } from 'sequelize';
import { QueryParams } from '../types/types';
import { History } from '../models/history.model';
import { User } from '../models/user.model';
class CategoryController {
  async getCategories(req: Request, res: Response) {
    const { page, search } = req.query;
    const limit = 10;
    const offset = (page ? Number(page) - 1 : 0) * limit;
    let query = {} as QueryParams;
    try {
      if (search) {
        query = {
          [Op.or]: [
            {
              name: {
                [Op.like]: `%${search}%`,
              },
              slug: {
                [Op.like]: `%${search}%`,
              },
            },
          ],
        };
      }
      const { rows, count } = await Category.findAndCountAll({
        where: query,
        offset: offset,
        limit: limit,
      });
      return res
        .status(200)
        .json({ categories: rows, totalPage: totalPage(count, 10) });
    } catch (error: any) {
      return res.status(500).json({ message: error?.message });
    }
  }
  async createCategory(req: Request, res: Response) {
    const user = req.decoded;
    const { name } = req.body;
    try {
      const existedCategory = await Category.findOne({
        where: {
          name: name,
        },
      });
      if (existedCategory)
        return res.status(409).json({ message: 'Danh mục đã tồn tại!' });
      const createdCategory = await Category.create({
        name: name,
        slug: formatDiacritics(name),
      });
      if (createdCategory) {
        await History.create({
          action: 'Tạo',
          user_id: user?.user_id,
          target_id: createdCategory.category_id,
          details: `${user?.user_id} đã tạo danh mục ${createdCategory.category_id}`,
        });
        return res.status(200).json({ message: 'Tạo danh mục thành công' });
      }
    } catch (error: any) {
      return res.status(500).json({ message: error?.message });
    }
  }
  async updateCategory(req: Request, res: Response) {
    const { name } = req.body;
    const { id } = req.params;
    try {
      const updatedCategory = await Category.update(
        {
          name: name,
          slug: formatDiacritics(name),
        },
        {
          where: {
            category_id: id,
          },
        }
      );
      console.log(updatedCategory);
      // if (updatedCategory[0]){
      //  await History.create({
      //    action: 'Cập nhật',
      //    user_id: user?.user_id,
      //    target_id: Number(id),
      //    details: `${user?.user_id} đã cập nhật danh mục ${updatedCategory[0].}`,
      //  });
      //  return res
      //    .status(200)
      //    .json({ message: 'Cập nhật danh mục thành công!' });
      // }
    } catch (error: any) {
      return res.status(500).json({ message: error?.message });
    }
  }
  async deleteCategory(req: Request, res: Response) {
    const user = req.decoded;
    const { id } = req.params;
    try {
      const deletedCategory = await Category.destroy({
        where: {
          category_id: id,
        },
      });
      if (deletedCategory) {
        await History.create({
          action: 'Xóa',
          user_id: user?.user_id,
          target_id: Number(id),
          details: `${user?.user_id} đã xóa danh mục ${id}`,
        });
        return res.status(200).json({ message: 'Xóa danh mục thành công!' });
      }
      return res.status(404).json({ message: 'Không tìm thấy bản ghi!' });
    } catch (error: any) {
      return res.status(500).json({ message: error?.message });
    }
  }
}

export default new CategoryController();
