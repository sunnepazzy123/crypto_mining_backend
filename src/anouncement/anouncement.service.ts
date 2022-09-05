import { Injectable, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Anouncement } from './anouncement.entity';
import { CreateAnouncementDto } from './dto/create_anouncement.dto';



@Injectable()
export class AnouncementService {
  constructor(@InjectRepository(Anouncement) private repo: Repository<Anouncement>) {

  }

  async save(body: CreateAnouncementDto) {
        const anouncement = this.repo.create(body);
        return await this.repo.save(anouncement)
  }

}
