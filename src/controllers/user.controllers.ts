import { Request, Response } from 'express';
import { User } from '../models/user.model';
import bcrypt from '../utils/bcrypt';

class UserController {
  async register(req: Request, res: Response): Promise<Response> {
    const user: User = req.body;
    try {
      const existedUser = await User.findOne({
        where: {
          email: user.email,
        },
      });
      if (existedUser)
        return res.status(409).json({ message: 'Tài khoản đã tồn tại!' });
      const hashedPassword = await bcrypt.hashPassword(user.password);
      user.password = hashedPassword;
      await User.create(user);
      return res.status(200).json({ message: 'Tạo tài khoản thành công!' });
    } catch (error) {
      return res.status(500).json({ message: '500. Lỗi server!' });
    }
  }
  async login(req: Request, res: Response): Promise<Response> {
    const user: User = req.body;
    try {
      const existedUser = await User.findOne({
        where: {
          email: user.email,
        },
      });
      if (!existedUser)
        return res.status(404).json({ message: 'Không tìm thấy người dùng!' });
      const match = await bcrypt.matchPassword(
        user.password,
        existedUser.password
      );
      if (!match) return res.status(403).json({ message: 'Sai mật khẩu!' });
      return res
        .status(200)
        .json({
          message: 'Đăng nhập tài khoản thành công!',
          user: existedUser,
        });
    } catch (error) {
      return res.status(500).json({ message: '500. Lỗi server!' });
    }
  }
}

export default new UserController();
