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
import { Max } from 'class-validator';

@Entity()
export class Package extends Model
   {
    @ManyToOne(() => User, (entity) => entity.package )
    @JoinColumn()
    user: User;

    @Column()
    userId: string

    @Column()
    plan: string;
  
    @Column({type: 'money'})
    amount: number;

    @Column()
    interest: number;
   
    @Column()
    income: number;

    @Column()
    count: number;

    @Column({type: 'smallint'})
    duration: number;
  
    @Column({type: 'date'})
    endDate: Date;

    @Column({type: 'varchar'})
    @Max(12)
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
  