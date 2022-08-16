import {
    Entity,
    Column,
    AfterInsert,
    AfterUpdate,
    AfterRemove,
    BeforeInsert,
  } from 'typeorm';
import { Exclude } from 'class-transformer';
import Model from 'src/entity/index.entity';

export enum RoleEnumType {
    USER = 'user',
    ADMIN = 'admin',
  }
  
@Entity()
export class User extends Model
   {
    @Column()
    firstName: string;

    @Column()
    lastName: string;
  
    @Column({unique: true})
    email: string;
  
    @Column()
    @Exclude()
    password: string;

    @Column({unique: true})
    username: string;

    @Column({
        type: 'enum',
        enum: RoleEnumType,
        default: 'user',
    })
    role: RoleEnumType.USER;
  
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
  