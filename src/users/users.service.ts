import { Injectable, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository, } from 'typeorm';
import { CreateUserDto } from './dto/create_user.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: MongoRepository<User>) {}

  create(body: CreateUserDto) {
    const user = this.repo.create(body);
    return this.repo.save(user);
  }

  find(email: string) {
    return this.repo.find({ where: { email } });
  }

}
