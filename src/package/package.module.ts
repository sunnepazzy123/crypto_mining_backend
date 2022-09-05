import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrentUserMiddleware } from 'src/middlewares/current-user.middlewares';
import { UsersModule } from 'src/users/users.module';
import { VaultModule } from 'src/vault/vault.module';
import { WalletModule } from 'src/wallet/wallet.module';
import { PackageController } from './package.controller';
import { Package } from './package.entity';
import { PackageService } from './package.service';



@Module({
  controllers: [PackageController],
  providers: [
    PackageService,
  ],
  imports: [
    TypeOrmModule.forFeature([Package]),
    UsersModule,
    VaultModule,
    WalletModule,
  ],
  exports: [PackageService]

})
export class PackageModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(CurrentUserMiddleware).forRoutes('*')
  }
}
