import {
    Entity,
    Column,
    AfterInsert,
    AfterUpdate,
    AfterRemove,
    BeforeInsert,
  } from 'typeorm';
import Model from 'src/entity/index.entity';
import { Max } from 'class-validator';

@Entity()
export class Anouncement extends Model
   {
    @Column({type: 'varchar'})
    text: string;
  
    @Column({type: 'varchar'})
    @Max(50)
    subject: string;

    @BeforeInsert()
    beforeInsert() {
      console.log('Before Insert'); 
    }
  
    @AfterInsert()
    logInsert() {
      console.log('Inserted User id ', this.id);
    }
  
    @AfterUpdate()
    logUpdate() {
      console.log('Update User id ', this.id);
    }
  
    @AfterRemove()
    logDelete() {
      console.log('Remove User id', this.id);
    }
  }
  