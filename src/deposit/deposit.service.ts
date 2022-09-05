import { Injectable, NotFoundException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Deposit } from './deposit.entity';
import { DepositTotal } from './depositTotal.entity';
import { CreateDepositDto } from './dto/create_deposit.dto';


@Injectable()
export class DepositService {
  constructor(
    @InjectRepository(Deposit) private repo: Repository<Deposit>,
    @InjectRepository(DepositTotal) private repoDepositTotal: Repository<DepositTotal>,
     ) {

  }

  async create(body: CreateDepositDto) {
    const deposit = this.repo.create(body);
    const new_deposit = await this.repo.save(deposit)
    const last_deposit_total = await this.repoDepositTotal.findOne({where: {userId: deposit.userId} });
    if(!last_deposit_total) {
      await this.repoDepositTotal.save({amount: new_deposit.amount, userId: deposit.userId, user: deposit.userId});
      return new_deposit;
    }
    const total = last_deposit_total.amount + new_deposit.amount
    await this.repoDepositTotal.save({amount: total, userId: deposit.userId, user: deposit.userId})
    return new_deposit;
  }

  async find() {
    const deposits = await this.repo.find();
    return deposits
  }

  async findAllByUser(id: string) {
    const deposits = await this.repo.find({
      where: {
        id
      }
    });
    return deposits
  }

  async findOne(id: string) {
    if(!id) {
      return null
    }
    try {
      const deposit = await this.repo.findOne({
        where: {id}
      });
      return deposit
    } catch (error) {
      throw new NotFoundException('Deposit not found')
    }

  }

  async getTotalByUser(userId: string) {
    if(!userId) {
      return null
    }
    try {
      const total_deposit = this.repoDepositTotal.findOne({where: {userId}})
      return total_deposit;
    } catch (error) {
      throw new NotFoundException('Deposit Total not found')
    }

  }
}
