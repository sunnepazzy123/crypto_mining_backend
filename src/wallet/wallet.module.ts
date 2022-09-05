import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletController } from './wallet.controller';
import { Wallet } from './wallet.entity';
import { WalletService } from './wallet.service';


@Module({
  controllers: [WalletController],
  providers: [
    WalletService,
  ],
  imports: [
    TypeOrmModule.forFeature([Wallet]),
  ],
  exports: [WalletService]

})
export class WalletModule {
  // configure(consumer: MiddlewareConsumer){
  //   consumer.apply(CurrentUserMiddleware).forRoutes('*')
  // }
}
