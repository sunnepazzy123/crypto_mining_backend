import { BadRequestException, Injectable, NotFoundException, } from '@nestjs/common';
import { UsersService } from '../users.service';
import { CreateUserDto } from '../dto/create_user.dto';
import { randomBytes, scrypt as _scrypt  } from 'crypto';
import { promisify } from 'util';


const scrypt = promisify(_scrypt);


@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
  ) {}

  async register(body: CreateUserDto) {
    const userFound = await this.userService.findByAttributes({email: body.email});    
    if (userFound) {
        throw new BadRequestException('User already exist');
    }
    const username = await this.userService.findByAttributes({username: body.username});
    if (username) {
        throw new BadRequestException('Username already exist');
    }
      //generate a salt
      const salt = randomBytes(8).toString('hex');
  
      //generate a hash
      const hash = (await scrypt(body.password, salt, 32)) as Buffer;
  
      const hashSaltedPassword = salt + '.' + hash.toString('hex');
      body.password = hashSaltedPassword
      const user = await this.userService.save(body);
      return user;
  }
  
  async login(body: {email: string, password: string}): Promise<any> {
    const user = await this.userService.findByAttributes({email: body.email});
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const [salt, storedHash] = user.password.split('.');
    //generate a hash
    const hash = (await scrypt(body.password, salt, 32)) as Buffer;

    if (hash.toString('hex') !== storedHash) {
      throw new BadRequestException('Invalid credential');
    }

    return user;
  }

}
