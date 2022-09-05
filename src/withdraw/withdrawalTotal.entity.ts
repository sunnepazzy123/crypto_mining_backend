import {
    Entity,
    Column,
  } from 'typeorm';

import Model from 'src/entity/index.entity';

@Entity()
export class WithDrawTotal extends Model
   {
    @Column()
    user: string;

    @Column({unique: true})
    userId: string;

    @Column({type: 'money'})
    amount: number;
  
  }
  