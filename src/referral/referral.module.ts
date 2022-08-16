import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReferralService } from './referral.service';
import { Referral } from './referral.entity';

@Module({
  providers: [
    ReferralService,
  ],
  imports: [
    TypeOrmModule.forFeature([Referral]),
  ],
  exports: [ReferralService]

})
export class ReferralModule {}
