import { 
  Column, 
  CreateDateColumn, 
  Entity, 
  PrimaryColumn, 
  UpdateDateColumn, 
} from 'typeorm';

import { v4 as uuid } from 'uuid';

@Entity('users')
export class UserEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  phone_number: string;

  @Column({ default: false })
  phone_number_confirmed: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) this.id = uuid()
  }
}
