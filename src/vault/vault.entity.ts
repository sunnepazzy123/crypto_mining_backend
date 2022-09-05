import {
    Entity,
    Column,
    AfterInsert,
    AfterUpdate,
    AfterRemove,
    BeforeInsert,
    JoinColumn,
    OneToOne,
  } from 'typeorm';
import Model from 'src/entity/index.entity';
import { User } from 'src/users/users.entity';

@Entity()
export class Vault extends Model
   {
    @OneToOne(() => User, (user) => user.vault)
    @JoinColumn()
    user: string;

    @Column({ nullable: true })
    userId: string

    @Column()
    pin: number;
  
    @Column({nullable: true})
    token: string;

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
  