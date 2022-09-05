import {
    Entity,
    Column,
    AfterInsert,
    AfterUpdate,
    AfterRemove,
    BeforeInsert,
    OneToOne,
  } from 'typeorm';
import Model from 'src/entity/index.entity';
import { User } from 'src/users/users.entity';

@Entity()
export class AnouncementView extends Model
   {
    @Column()
    @OneToOne(() => User, (entity) => entity.anouncementView)
    user: string

    @Column()
    userId: string

    @Column({array: true, default: []})
    views: string[]
  
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
  