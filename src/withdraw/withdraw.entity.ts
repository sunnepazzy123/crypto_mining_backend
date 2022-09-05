import {
    Entity,
    Column,
    AfterInsert,
    AfterUpdate,
    AfterRemove,
    BeforeInsert,
    JoinColumn,
    ManyToOne,
  } from 'typeorm';
import Model from 'src/entity/index.entity';
import { User } from 'src/users/users.entity';

@Entity()
export class WithDraw extends Model
   {
    @ManyToOne(() => User, (user) => user.vault)
    @JoinColumn()
    user: string;

    @Column()
    userId: string

    @Column()
    amount: number;

    @Column({default: 'unapproved', enum: ['unapproved', 'approved']})
    status: string;
  
    
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
  