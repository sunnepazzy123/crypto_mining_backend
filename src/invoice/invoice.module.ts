import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoinBaseModule } from 'src/coinbase/coinbase.module';
import { InvoiceController } from './invoice.controller';
import { Invoice } from './invoice.entity';
import { InvoiceService } from './invoice.service';


@Module({
  controllers: [InvoiceController],
  providers: [
    InvoiceService,
  ],
  imports: [
    CoinBaseModule,
    TypeOrmModule.forFeature([Invoice])
  ],
  exports: [InvoiceService]

})
export class InvoiceModule {}
