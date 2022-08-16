import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategyService } from '../strategy/jwt.strategy';
import { LocalStrategyService } from '../strategy/local.strategy';
import { UsersModule } from '../users.module';
import { AuthService } from './auth.service';


@Module({
  providers: [
    AuthService,
    LocalStrategyService,
    JwtStrategyService,
    JwtService,
],
  imports: [
    UsersModule,
    PassportModule,
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
})
export class AuthModule {}
