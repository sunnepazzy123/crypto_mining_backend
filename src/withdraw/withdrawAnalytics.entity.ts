import {
    Entity,
    Column,
  } from 'typeorm';

import Model from 'src/entity/index.entity';

@Entity()
export class WithDrawAnalytics extends Model
   {
    @Column()
    user: string;

    @Column()
    userId: string;

    @Column({type: 'money'})
    amount: number;
  }
  