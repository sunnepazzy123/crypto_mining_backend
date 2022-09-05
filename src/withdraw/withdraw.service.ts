import { BadRequestException, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VaultService } from 'src/vault/vault.service';
import { WalletService } from 'src/wallet/wallet.service';
import { Repository, } from 'typeorm';
import { GetWithdrawalDto } from './dto/get_withdrawal.dto';
import { WithdrawUserDto } from './dto/withdraw.dto';
import { WithDraw } from './withdraw.entity';
import { WithDrawTotal } from './withdrawalTotal.entity';

@Injectable()
export class WithDrawService {
  constructor(
    @InjectRepository(WithDraw) private repo: Repository<WithDraw>,
    @InjectRepository(WithDrawTotal) private repoWithdrawTotal: Repository<WithDrawTotal>,
    private walletService: WalletService,
    private vaultService: VaultService,
    ) {}

 async create(body: WithdrawUserDto) {
    const pinFound = await this.vaultService.getPin(body);
    if(!pinFound){
      throw new BadRequestException('incorrect pin')
    }
    const lastWallet = await this.walletService.getLastWallet(body.user);
    if(body.amount > lastWallet.balance) {
      throw new BadRequestException('insufficient fund')
    }
    const latestWallet = await this.walletService.debit(body.amount, body.user);    
    const withdraw = this.repo.create(body);
    const new_withdraw = await this.repo.save(withdraw);

    const last_withdraw_total = await this.repoWithdrawTotal.findOne({where: {userId: new_withdraw.userId} });
    if(!last_withdraw_total) {
      await this.repoWithdrawTotal.save({amount: 0, userId: body.userId, user: body.userId});
      return lastWallet;
    }
    const total = last_withdraw_total.amount + new_withdraw.amount
    await this.repoWithdrawTotal.save({amount: total, userId: new_withdraw.userId})
    
    return latestWallet;
 }

 async find(body: GetWithdrawalDto) {
    const withdrawal = await this.repo.find({
        where: {userId: body.user}
    });
    return withdrawal;
 }

 async findAll() {
    const withdrawals = await this.repo.find();
    return withdrawals;
 }

 async getTotalByUser(userId: string) {
   const total = await this.repoWithdrawTotal.findOne({where: {userId}});
   return total;
}
}