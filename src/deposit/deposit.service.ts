import { Injectable, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Deposit } from './deposit.entity';
import { CreateDepositDto } from './dto/create_deposit.dto';


@Injectable()
export class DepositService {
  constructor(@InjectRepository(Deposit) private repo: Repository<Deposit>) {

  }

  async create(body: CreateDepositDto) {
        const deposit = this.repo.create(body);
        return this.repo.save(deposit)
  }

}
