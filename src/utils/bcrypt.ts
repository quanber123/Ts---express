import bcrypt from 'bcryptjs';

class Bcrypt {
  public async hashPassword(password: string) {
    return bcrypt.hashSync(password);
  }
  public async matchPassword(password: string, hasPassword: string) {
    return bcrypt.compareSync(password, hasPassword);
  }
}

export default new Bcrypt();
