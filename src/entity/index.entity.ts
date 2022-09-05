import {
    CreateDateColumn,
    BaseEntity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    Column,
    Generated,

  } from 'typeorm';
  
  export default abstract class Model extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    created_at: Date; 

    @UpdateDateColumn()
    updated_at: Date; 
  }
  