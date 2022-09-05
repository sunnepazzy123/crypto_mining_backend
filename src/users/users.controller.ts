import {
    Body,
    Controller,
    Get,
    NotFoundException,
    Param,
    Post,
    Req,
    Session,
    UseGuards,
  } from '@nestjs/common';
import { ApiResponse, ApiResponseProperty, ApiTags } from '@nestjs/swagger';
import { AdminAuthGuard,} from 'src/guards/admin.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { VaultService } from 'src/vault/vault.service';
import { AuthService } from './auth/auth.service';
import { CreateUserDto } from './dto/create_user.dto';
import { UserDto } from './dto/user.dto';
import { JwtAuthGuard } from './strategy/jwt.auth.guard';
import { LocalAuthGuard } from './strategy/local.auth';
import { UsersService } from './users.service';

@ApiTags('Auth')
@Controller('/auth')
@Serialize(UserDto)
export class UsersController {
    constructor(
      private usersService: UsersService,
      private authService: AuthService,
      private vaultService: VaultService,
    ) {}

    @ApiResponseProperty({})
    @Post('/register')
    async register(@Body() body: CreateUserDto, @Session() session: any) {
      const user = await this.authService.register(body);
      session.user = await this.vaultService.generateToken(user);
      return {access_token: session.user};
    }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Req() req, @Session() session: any) {
        session.user = await this.vaultService.generateToken(req.user);
        return {
          access_token: session.user
        }
      }

    @UseGuards(JwtAuthGuard)
    @Get('/profile')
    async profile(@Req() req) {
        const user = await this.usersService.findOne(req.user.id);
        return user
      }
    
    @UseGuards(JwtAuthGuard)
    @Post('/logout')
    async logout(@Req() req, @Session() session: any) {
      delete req.user
      delete session.id
      return
      }

    @UseGuards(AdminAuthGuard)
    @Get('/users')
    async getUsers() {
        return await this.usersService.find();
      }

    @UseGuards(AdminAuthGuard)
    @Get('/users/:id')
    async getUser(@Param('id') id: string) {
      const user = await this.usersService.findOne(id);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    }
  }
  