import { BadRequestException, Injectable, NotFoundException, } from '@nestjs/common';
import { UsersService } from '../users.service';
import { CreateUserDto } from '../dto/create_user.dto';
import { randomBytes, scrypt as _scrypt  } from 'crypto';
import { promisify } from 'util';
import { LoginDto } from '../dto/login.dto';
import { JwtService } from '@nestjs/jwt';

const scrypt = promisify(_scrypt);


@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService

  ) {}

  async register(body: CreateUserDto) {
    const users = await this.userService.find(body.email);
    if (users.length) {
        throw new BadRequestException('User already exist');
      }
      //generate a salt
      const salt = randomBytes(8).toString('hex');
  
      //generate a hash
      const hash = (await scrypt(body.password, salt, 32)) as Buffer;
  
      const hashSaltedPassword = salt + '.' + hash.toString('hex');
      body.password = hashSaltedPassword
      const user = await this.userService.create(body);
      return user;
  }

  async login(body: LoginDto) {
    const [user] = await this.userService.find(body.email);
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

  async validateUser(email: string, password: string): Promise<any> {
    const [user] = await this.userService.find(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const [salt, storedHash] = user.password.split('.');
    //generate a hash
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (hash.toString('hex') !== storedHash) {
      throw new BadRequestException('Invalid credential');
    }

    return user;
  }

  async generateToken(user: any) {
    const payload = { _id: user._id, role: user.role, username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
