import { BadRequestException, Injectable, NotFoundException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWalletDto } from './dto/create_wallet.dto';
import { Wallet } from './wallet.entity';


@Injectable()
export class WalletService {
  constructor(@InjectRepository(Wallet) private repo: Repository<Wallet>) {

  }

  async create(body: CreateWalletDto) {
   const wallet = this.repo.create(body)
   return await this.repo.save(wallet)
  }

  async findOne(id: string) {
    try {
      if(!id) {
        return null
      }
      return await this.repo.findOne({
        where: { id },      
      });
    } catch (_) {
         throw new NotFoundException('Wallet not found ', id);
    }

   }

   find() {
      return this.repo.find({})
     }

   findAll(userId: string) {
    return this.repo.find({where: {userId}})
  }

async getLastWallet(userId: string) {
      const wallet = await this.repo.findOne({
        where: {userId},
        order: {id: 'DESC'},
      })
      
      return wallet;
   }

async debit(amount: number, userId: string) {
    const wallet = await this.getLastWallet(userId);

    if(!wallet) throw new NotFoundException();

    if(wallet.balance < amount) throw new BadRequestException('amount exceeded wallet balance');

    const walletLedger = {
            debit: amount,
            credit: 0,
            balance: wallet.balance - amount,
            remark: `Debit Alert of $${amount} from your fund Wallet`,
            user: userId,
          };
    const debitLedger = this.repo.create(walletLedger);
    return await this.repo.save(debitLedger);
 }

async credit(amount: number, userId: string) {
       const wallet = await this.getLastWallet(userId);

      if(!wallet) throw new NotFoundException();

      const walletLedger = {
        debit: 0,
        credit: amount,
        balance: wallet.balance + amount,
        remark: `Credit Alert of $${amount} to your fund Wallet`,
        user: userId,
      };
      const debitLedger = this.repo.create(walletLedger);
      return await this.repo.save(debitLedger);
}



}
