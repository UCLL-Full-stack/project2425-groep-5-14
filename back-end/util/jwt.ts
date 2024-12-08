import jwt from 'jsonwebtoken';

export const generateJWTToken = (username: string, role: string): string => {
  return jwt.sign({ username, role }, process.env.JWT_SECRET!, { expiresIn: `${process.env.JWT_EXPIRES_HOURS}h` });
};