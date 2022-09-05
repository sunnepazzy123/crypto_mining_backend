import {
    Entity,
    Column,
    AfterInsert,
    AfterUpdate,
    AfterRemove,
    BeforeInsert,
    OneToOne,
    JoinColumn,
  } from 'typeorm';

import Model from 'src/entity/index.entity';
import { User } from 'src/users/users.entity';

@Entity()
export class ReferralTotal extends Model
   {
    @OneToOne(() => User, (user) => user.referral)
    @JoinColumn()
    user: string;

    @Column({unique: true})
    userId: string

    @Column()
    total: number
  
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
  