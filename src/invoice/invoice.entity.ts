import {
    Entity,
    Column,
  } from 'typeorm';
import Model from 'src/entity/index.entity';

@Entity()
export class Invoice extends Model
   {
    @Column()
    userId: string;

    @Column({type: 'money'})
    amount: number;
  
    @Column()
    code: string;

    @Column()
    invoiceId: string;
   
    @Column()
    remark: string;

    @Column()
    status: string;
  
  }
  