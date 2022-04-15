import { CreateUserDto } from '@modules/users/domain/dtos/create-user.dto';

import { UserEntity } from '@modules/users/infra/typeorm/entities/user.entity';
import { UpdateUserDto } from '../dtos/update-user.dto';

export interface IUsersRepository {
  confirmPhoneNumber(user_id: string): Promise<void>;
  create(data: CreateUserDto): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity>;
  findById(id: string): Promise<UserEntity>;
  findByPhoneNumber(phone_number: string): Promise<UserEntity>;
  update(data: UpdateUserDto): Promise<void>;
}