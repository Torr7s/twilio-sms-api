import { UserEntity } from '@modules/users/infra/typeorm/entities/user.entity';

export interface IPayload {
  sub: string;
}

export interface IAuthProvider {
  comparePasswords(password: string, hashedPassword: string): Promise<boolean>;
  hashPassword(password: string, salt: number): Promise<string>;
  signToken(sub: string): string;
  validateUser(email: string, password: string): Promise<UserEntity>;
  verifyToken(token: string): IPayload;
}