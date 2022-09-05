import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnouncementViewService } from './anouncementView.service';


@Module({
  providers: [AnouncementViewService],
  imports: [
    TypeOrmModule.forFeature([AnouncementViewService]),
  ],
  exports: [AnouncementViewService]

})
export class AnouncemenViewtModule {}
