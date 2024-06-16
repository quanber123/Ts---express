import { Request, Response } from 'express';
import { User } from '../models/user.model';
import bcrypt from '../utils/bcrypt';
import { blackList, signToken } from '../utils/token';
import jwt from 'jsonwebtoken';
import {
  deleteFile,
  formatDate,
  formatDiacritics,
  formatTime,
} from '../utils/helper';
import { Role } from '../models/role.model';

class UserController {
  async getUser(req: Request, res: Response) {
    const user = (req as any)?.decoded as User;
    try {
      const existedUser = await User.findOne({
        where: {
          user_id: user?.user_id,
        },
        include: [
          {
            model: Role,
            as: 'roleInfo',
          },
        ],
      });
      if (existedUser) return res.status(200).json(existedUser);
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    } catch (error: any) {
      return res.status(500).json({ message: error?.message });
    }
  }
  async register(req: Request, res: Response) {
    const { username, email, password } = req.body;
    try {
      const existedUser = await User.findOne({
        where: {
          email: email,
        },
      });
      if (existedUser)
        return res.status(409).json({ message: 'Tài khoản đã tồn tại!' });
      const hashedPassword = await bcrypt.hashPassword(password);
      await User.create({
        email: email,
        username: username,
        slug: formatDiacritics(username),
        password: hashedPassword,
        role: 0,
        created_at: formatTime(new Date().toString()),
        updated_at: formatTime(new Date().toString()),
      });
      return res.status(201).json({ message: 'Tạo tài khoản thành công!' });
    } catch (error: any) {
      return res.status(500).json({ message: error?.message });
    }
  }
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const existedUser = await User.findOne({
        where: {
          email: email,
        },
        // attributes: [
        //   'user_id',
        //   'email',
        //   'username',
        //   'slug',
        //   'birthday',
        //   'isVerified',
        // ],
      });
      if (!existedUser)
        return res.status(404).json({ message: 'Không tìm thấy ng ười dùng!' });
      const match = await bcrypt.matchPassword(
        password,
        existedUser.dataValues.password
      );
      if (!match) return res.status(403).json({ message: 'Sai mật khẩu!' });
      const token = await signToken({ ...existedUser.dataValues });
      return res.status(200).json({
        accessToken: token,
      });
    } catch (error: any) {
      return res.status(500).json({ message: error?.message });
    }
  }
  async logout(req: Request, res: Response) {
    const token = req.headers['authorization'];
    const getToken = token?.split(' ')[1];
    try {
      if (!getToken) {
        return res.status(401).json({
          error: true,
          success: false,
          message: 'Token không tồn tại!',
        });
      }
      if (blackList.has(getToken))
        return res.status(409).json({
          error: true,
          success: false,
          message: 'Tài khoản này đã đăng xuất rồi!',
        });
      jwt.verify(
        getToken,
        process.env.ACCESS_TOKEN_SECRET as string,
        (err, decoded) => {
          if (err) {
            return res.status(403).json({
              error: true,
              success: false,
              message: 'Token không hợp lệ!',
            });
          }
          if (decoded) {
            blackList.add(getToken);
            if (blackList.has(getToken))
              return res.status(200).json({
                error: false,
                success: true,
                message: 'Đăng xuất thành công!',
              });
          }
        }
      );
    } catch (error) {}
  }
  async updateProfile(req: Request, res: Response) {
    const { id } = req.params;
    const { username, birthday } = req.body;
    try {
      const updatedUser = await User.findByPk(id);
      if (updatedUser) {
        updatedUser.username = username;
        updatedUser.birthday = birthday ? formatDate(birthday) : null;
        updatedUser.updated_at = formatTime(new Date().toString());
        updatedUser.save();
        return res
          .status(200)
          .json({ message: 'Cập nhật thông tin người dùng thành công!' });
      }
      return res.status(404).json({ message: 'Không tìm thấy người dùng!' });
    } catch (error: any) {
      return res.status(500).json({ message: error?.message });
    }
  }
  async updateAvatar(req: Request, res: Response) {
    const { id } = req.params;
    const { oldAvatar } = req.body;
    const files = req.files as any;
    try {
      const updatedUser = await User.findByPk(id);
      if (updatedUser) {
        updatedUser.avatar = files?.avatar[0]?.path;
        updatedUser.updated_at = formatTime(new Date().toString());
        await Promise.allSettled([deleteFile(oldAvatar), updatedUser.save()]);
        return res.status(200).json({ message: 'Cập nhật ảnh thành công' });
      }
      return res.status(404).json({ message: 'Không tìm thấy người dùng!' });
    } catch (error: any) {
      return res.status(500).json({ message: error?.message });
    }
  }
  async changePassword(req: Request, res: Response) {
    const { id } = req.params;
    const { current_password, new_password } = req.body;
    try {
      const updatedUser = await User.findByPk(id);
      if (updatedUser) {
        const match = await bcrypt.matchPassword(
          current_password,
          updatedUser.password
        );
        if (match) {
          updatedUser.password = await bcrypt.hashPassword(new_password);
          updatedUser.updated_at = formatTime(new Date().toString());
          await updatedUser.save();
          return res
            .status(200)
            .json({ message: 'Cập nhật mật khẩu thành công!' });
        }
        return res
          .status(403)
          .json({ message: 'Mật khẩu hiện tại không chính xác!' });
      }
      return res.status(404).json({ message: 'Không tìm thấy người dùng!' });
    } catch (error: any) {
      return res.status(500).json({ message: error?.message });
    }
  }
}

export default new UserController();
