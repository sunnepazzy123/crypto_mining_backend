import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WithDrawController } from './withdraw.controller';
import { WithDrawService } from './withdraw.service';
import { WithDraw } from './withdraw.entity';
import { HelperModule } from 'src/helpers/helpers.module';
import { VaultModule } from 'src/vault/vault.module';
import { WalletModule } from 'src/wallet/wallet.module';


@Module({
 controllers: [WithDrawController],
  providers: [
    WithDrawService,
  ],
  imports: [
    TypeOrmModule.forFeature([WithDraw]),
    HelperModule,
    VaultModule,
    WalletModule,
  ],
  exports: [WithDrawService]

})
export class WithDrawModule {}