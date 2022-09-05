import { Module } from '@nestjs/common';
import { PackageModule } from 'src/package/package.module';
import { ReferralModule } from 'src/referral/referral.module';
import { ReferralService } from 'src/referral/referral.service';
import { UsersModule } from 'src/users/users.module';
import { WalletModule } from 'src/wallet/wallet.module';
import { JobService } from './job.service';


@Module({
  imports: [
    PackageModule,
    WalletModule,
    UsersModule,
    ReferralModule,
    UsersModule,
  ],
  providers: [JobService],
  exports: [JobService]
})
export class JobModule {

}
