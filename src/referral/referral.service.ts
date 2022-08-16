import { Injectable, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReferralDto } from './dto/create_referral.dto';
import { Referral } from './referral.entity';


@Injectable()
export class ReferralService {
  constructor(@InjectRepository(Referral) private repo: Repository<Referral>) {

  }

  create(body: CreateReferralDto) {
        const referral = this.repo.create(body);
        return this.repo.save(referral)
  }

}
