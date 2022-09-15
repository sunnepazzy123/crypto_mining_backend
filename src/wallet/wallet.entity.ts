import {
    Entity,
    Column,
    AfterInsert,
    AfterUpdate,
    AfterRemove,
    BeforeInsert,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
import Model from 'src/entity/index.entity';
import { User } from 'src/users/users.entity';

@Entity()
export class Wallet extends Model
   {
    @ManyToOne(() => User, entity => entity.wallet)
    @JoinColumn()
    user: string;
    
    @Column()
    userId: string
    
    @Column({type: 'money', default: 0})
    debit: number;

    @Column({type: 'money', default: 0})
    credit: number;

    @Column({type: 'money'})
    balance: number;
  
    @Column({nullable: false})
    remark: string;

    @BeforeInsert()
    beforeInsert() {
      console.log('Before Insert');
  
    }
  
    @AfterInsert()
    logInsert() {

    }
  
    @AfterUpdate()
    logUpdate() {
    }
  
    @AfterRemove()
    logDelete() {
    }
  }
  