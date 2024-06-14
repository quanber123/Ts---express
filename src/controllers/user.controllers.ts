import { Request, Response } from 'express';
import { User } from '../models/user.model';
import bcrypt from '../utils/bcrypt';
import { signToken } from '../utils/token';

class UserController {
  async getUser(req: Request, res: Response) {
    const user = req.decoded;
    try {
      const existedUser = await User.findByPk(user?.user_id);
      if (existedUser) return res.status(200).json(existedUser);
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    } catch (error: any) {
      return res.status(500).json({ message: error?.message });
    }
  }
  async register(req: Request, res: Response) {
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
    } catch (error: any) {
      return res.status(500).json({ message: error?.message });
    }
  }
  async login(req: Request, res: Response) {
    const user: User = req.body;
    try {
      const existedUser = await User.findOne({
        where: {
          email: user.email,
        },
        attributes: [
          'user_id',
          'email',
          'username',
          'slug',
          'birthday',
          'isVerified',
        ],
      });
      if (!existedUser)
        return res.status(404).json({ message: 'Không tìm thấy người dùng!' });
      const match = await bcrypt.matchPassword(
        user.password,
        existedUser.password
      );
      if (!match) return res.status(403).json({ message: 'Sai mật khẩu!' });
      const token = await signToken(existedUser);
      return res.status(200).json({
        accessToken: token,
      });
    } catch (error: any) {
      return res.status(500).json({ message: error?.message });
    }
  }
}

export default new UserController();
