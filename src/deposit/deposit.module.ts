import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoinBaseModule } from 'src/coinbase/coinbase.module';
import { CoinBaseService } from 'src/coinbase/coinbase.service';
import { InvoiceModule } from 'src/invoice/invoice.module';
import { WalletModule } from 'src/wallet/wallet.module';
import { DepositController } from './deposit.controller';
import { Deposit } from './deposit.entity';
import { DepositService } from './deposit.service';


@Module({
  controllers: [DepositController],
  providers: [
    DepositService,
    ConfigService,
  ],
  imports: [
    TypeOrmModule.forFeature([Deposit]),
    CoinBaseModule,
    InvoiceModule,
    WalletModule,
  ],
  exports: [DepositService]

})
export class DepositModule {}
