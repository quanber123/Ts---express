import crypto from 'crypto';

class GenerateRandomString {
  public generateVerificationCode() {
    return crypto.randomBytes(2).toString('hex');
  }
  public generateRandomToken() {
    return crypto.randomBytes(64).toString('hex');
  }
}

export default new GenerateRandomString();
