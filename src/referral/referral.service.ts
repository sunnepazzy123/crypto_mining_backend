import { Injectable, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReferralDto } from './dto/create_referral.dto';
import { Referral } from './referral.entity';


@Injectable()
export class ReferralService {
  constructor(@InjectRepository(Referral) private repo: Repository<Referral>) {

  }

  async save(body: CreateReferralDto) {
        const referral = this.repo.create(body);
        return await this.repo.save(referral)
  }

  async findOneByUser(id: string) {
    const referral = await this.repo.findOne({
      where: {user: id}
    });
    return referral;
}

}
