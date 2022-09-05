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

@Entity({name: 'wallet'})
export class WalletTotal extends Model
   {
    @ManyToOne(() => User, entity => entity.wallet)
    @JoinColumn()
    user: string;
    
    @Column()
    userId: string
    
    @Column({type: 'money'})
    balance: number;

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
  