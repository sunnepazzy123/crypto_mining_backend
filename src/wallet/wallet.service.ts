import { Injectable, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from './wallet.entity';


@Injectable()
export class WalletService {
  constructor(@InjectRepository(Wallet) private repo: Repository<Wallet>) {

  }

  create(body: any) {
   const wallet = this.repo.create(body)
   return this.repo.save(wallet)
  }

  findOne(userId: string) {
    const wallet = this.repo.findOne({
        where: { userId },      
    })
    return wallet
   }

}
