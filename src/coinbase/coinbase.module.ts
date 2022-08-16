import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CoinBaseService } from './coinbase.service';


@Module({
  providers: [CoinBaseService, ConfigService],
  exports: [CoinBaseService]
})
export class CoinBaseModule {}
