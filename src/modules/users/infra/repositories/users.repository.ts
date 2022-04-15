import { Injectable } from '@nestjs/common';

import { Connection, Repository } from 'typeorm';

import { IUsersRepository } from '@modules/users/domain/repositories/users.interface';
import { CreateUserDto } from '@modules/users/domain/dtos/create-user.dto';
import { UserEntity } from '../typeorm/entities/user.entity';
import { UpdateUserDto } from '@modules/users/domain/dtos/update-user.dto';

@Injectable()
export class UsersRepository implements IUsersRepository {
  private _usersRepository: Repository<UserEntity>

  constructor(private readonly connection: Connection) {
    this._usersRepository = this.connection.getRepository(UserEntity)
  }

  async confirmPhoneNumber(user_id: string): Promise<void> {
    await this._usersRepository.update({ id: user_id }, {
      phone_number_confirmed: true
    })
  }

  async create({ name, email, password, phone_number }: CreateUserDto): Promise<UserEntity> {
    const new_user_record = this._usersRepository
      .create({
        name,
        email,
        password,
        phone_number
      })

    await this._usersRepository.save(new_user_record)

    return new_user_record
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const userRecord = await this._usersRepository.findOne({ email })

    return userRecord
  }

  async findById(id: string): Promise<UserEntity> {
    const userRecord = await this._usersRepository.findOne({ id })

    return userRecord
  }

  async findByPhoneNumber(phone_number: string): Promise<UserEntity> {
    const userRecord = await this._usersRepository.findOne({ phone_number })

    return userRecord
  }

  async update({ id, name, email, password }: UpdateUserDto): Promise<void> {
    const userRecord = await this.findById(id)

    await this._usersRepository.update(id, {
      name: name ?? userRecord.name,
      email: email ?? userRecord.email,
      password: password ?? userRecord.password,
    })
  }
}