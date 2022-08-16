import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth/auth.service';
import { UsersController } from './users.controller';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
    {
      provide: "JWT_PUBLIC_KEY",
      useFactory: async (configService: ConfigService) => {
          return configService.get('JWT_PUBLIC_KEY')
      },
      inject: [ConfigService],
    },
  ],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '600s' },
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [UsersService]

})
export class UsersModule {}
