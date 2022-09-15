import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoinBaseModule } from 'src/coinbase/coinbase.module';
import { InvoiceModule } from 'src/invoice/invoice.module';
import { WalletModule } from 'src/wallet/wallet.module';
import { DepositController } from './deposit.controller';
import { Deposit } from './deposit.entity';
import { DepositService } from './deposit.service';
import { DepositAnalytics } from './depositAnalytics.entity';
import { DepositTotal } from './depositTotal.entity';


@Module({
  controllers: [DepositController],
  providers: [
    DepositService,
    ConfigService,
  ],
  imports: [
    TypeOrmModule.forFeature([Deposit, DepositTotal, DepositAnalytics]),
    CoinBaseModule,
    InvoiceModule,
    WalletModule,
  ],
  exports: [DepositService]

})
export class DepositModule {}
