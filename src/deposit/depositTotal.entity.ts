import {
    Entity,
    Column,
  } from 'typeorm';

import Model from 'src/entity/index.entity';

@Entity()
export class DepositTotal extends Model
   {
    @Column()
    user: string;

    @Column({unique: true})
    userId: string;

    @Column({type: 'money'})
    amount: number;
  
  }
  