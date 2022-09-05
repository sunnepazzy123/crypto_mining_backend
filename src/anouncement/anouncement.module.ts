import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnouncementController } from './anouncement.controller';
import { Anouncement } from './anouncement.entity';
import { AnouncementService } from './anouncement.service';


@Module({
  controllers: [AnouncementController],
  providers: [AnouncementService],
  imports: [
    TypeOrmModule.forFeature([Anouncement]),
  ],
  exports: [AnouncementService]

})
export class AnouncementModule {}
