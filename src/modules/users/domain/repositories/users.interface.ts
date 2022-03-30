import { CreateUserDto } from '@modules/users/dtos/create-user.dto';

import { UserEntity } from '@modules/users/infra/typeorm/entities/user.entity';

export interface IUsersRepository {
  confirmPhoneNumber(user_id: string): Promise<void>;
  create(data: CreateUserDto): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity>;
  findByPhoneNumber(phone_number: string): Promise<UserEntity>;
}