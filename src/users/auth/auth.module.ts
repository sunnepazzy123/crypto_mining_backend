import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule,  } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy,  } from '../strategy/jwt.strategy';
import { LocalStrategyService } from '../strategy/local.strategy';
import { UsersModule } from '../users.module';
import { AuthService } from './auth.service';


@Module({
  providers: [
    AuthService,
    LocalStrategyService,
    JwtStrategy,
],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '3d' },
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [AuthService]
})
export class AuthModule {}
