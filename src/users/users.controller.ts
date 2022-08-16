import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
    Put,
    Query,
    Req,
    Session,
    UseGuards,
  } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth/auth.service';
import { CreateUserDto } from './dto/create_user.dto';
import { UserDto } from './dto/user.dto';
import { LocalAuthGuard } from './strategy/local.auth';
import { UsersService } from './users.service';

  
@Controller('/auth')
@Serialize(UserDto)
export class UsersController {
    constructor(
      private usersService: UsersService,
      private authService: AuthService
    ) {}

    @Post('/register')
    async register(@Body() body: CreateUserDto, @Session() session: any) {
      const user = await this.authService.register(body);
      session.user = {
        _id: user._id,
        email: user.email
      };
      return user;
    }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Req() req, @Session() session: any) {
        const token = await this.authService.generateToken(req.user);
        return token
      }
   
  }
  