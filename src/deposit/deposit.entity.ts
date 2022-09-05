import {
    Entity,
    Column,
  } from 'typeorm';

import Model from 'src/entity/index.entity';

@Entity()
export class Deposit extends Model
   {
    @Column()
    user: string;

    @Column()
    userId: string;

    @Column({type: 'money'})
    amount: number;
  
    @Column()
    reference: string;
   
    @Column()
    remark: string;

    @Column()
    type: string;

  }
  