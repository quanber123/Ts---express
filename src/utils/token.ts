import jwt from 'jsonwebtoken';
export const blackList = new Set();
export const signToken = async (data: any, expiresIn?: string) => {
  return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: expiresIn ? expiresIn : '7d',
  });
};
