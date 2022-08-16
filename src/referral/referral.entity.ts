import {
    Entity,
    Column,
    AfterInsert,
    AfterUpdate,
    AfterRemove,
    BeforeInsert,
  } from 'typeorm';

import Model from 'src/entity/index.entity';

@Entity()
export class Referral extends Model
   {
    @Column()
    userId: string;

    @Column()
    referredById: string;
  
    @BeforeInsert()
    beforeInsert() {
      console.log('Before Insert');
  
    }
  
    @AfterInsert()
    logInsert() {
      console.log('Inserted User id ', this._id);
    }
  
    @AfterUpdate()
    logUpdate() {
      console.log('Update User id ', this._id);
    }
  
    @AfterRemove()
    logDelete() {
      console.log('Remove User id', this._id);
    }
  }
  