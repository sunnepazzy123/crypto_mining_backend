import { Injectable, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnouncementView } from './anouncementView.entity';
import { CreateAnouncementDto } from './dto/create_anouncement.dto';



@Injectable()
export class AnouncementViewService {
  constructor(@InjectRepository(AnouncementView) private repo: Repository<AnouncementView>) {

  }

  async save(body: CreateAnouncementDto) {
        const anouncementView = this.repo.create(body);
        return await this.repo.save(anouncementView)
  }

}
