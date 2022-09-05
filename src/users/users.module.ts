import { MiddlewareConsumer, Module, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReferralModule } from 'src/referral/referral.module';
import { Vault } from 'src/vault/vault.entity';
import { VaultModule } from 'src/vault/vault.module';
import { Wallet } from 'src/wallet/wallet.entity';
import { WalletModule } from 'src/wallet/wallet.module';
import { AuthService } from './auth/auth.service';
import { JwtStrategy,  } from './strategy/jwt.strategy';
import { UsersController } from './users.controller';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { CurrentUserMiddleware } from 'src/middlewares/current-user.middlewares';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
    JwtStrategy,
  ],
  imports: [
    TypeOrmModule.forFeature([User, Wallet, Vault]),
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '3d' },
        };
      },
      inject: [ConfigService],
    }),
    forwardRef(() => WalletModule),
    ReferralModule,
    VaultModule,
  ],
  exports: [UsersService]

})
export class UsersModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(CurrentUserMiddleware).forRoutes('*')
  }
}
