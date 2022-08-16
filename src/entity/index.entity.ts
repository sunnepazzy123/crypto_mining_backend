import {
    CreateDateColumn,
    ObjectIdColumn,
    BaseEntity,

  } from 'typeorm';
  
  export default abstract class Model extends BaseEntity {
    @ObjectIdColumn()
    _id: string;
  
    @CreateDateColumn()
    created_at: Date; 

  }
  