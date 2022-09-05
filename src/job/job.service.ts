import { Injectable, Logger } from '@nestjs/common';
import { PackageService } from 'src/package/package.service';
import { ReferralService } from 'src/referral/referral.service';
import { UsersService } from 'src/users/users.service';
import { CreateWalletDto } from 'src/wallet/dto/create_wallet.dto';
import { WalletService } from 'src/wallet/wallet.service';


@Injectable()
export class JobService {
  constructor(
    private packageService: PackageService,
    private walletService: WalletService,
    private referralService: ReferralService,
    private userService: UsersService
    ) {}
  private readonly logger = new Logger(JobService.name);

  // @Cron('45 * * * * *')
  async handleCron() {
    const currentDate = new Date();
    this.logger.debug('job is running ', currentDate);

    const packages = await this.packageService.find({status: 'subscribed'});
    for(const p of packages) { 

    const referral = await this.referralService.findOneByUser(p.user.id);
    const wallet = await this.walletService.getLastWallet(p.user.id);
    const userWhoReferredYou = await this.userService.findByAttributes({username: referral.referredBy});
    const walletReferral = await this.walletService.getLastWallet(userWhoReferredYou.id);

    const packageStartDate = new Date(p.created_at);
    const packageDuration = p.duration * 30; // in months
    let daysDifference = this.date_diff_indays(packageStartDate, currentDate);
    daysDifference = Math.min(packageDuration, daysDifference);

    const count = Math.floor(daysDifference / 30);
    const maxIncome = p.duration * p.interest * p.amount
    const currentIncome = p.interest * p.amount * count

    if (count <= 0) p.income = 0;
    else p.income = p.amount * p.interest;

    if(maxIncome === currentIncome) {
      const ledger = {
        debit: 0,
        credit: p.income + p.amount,
        balance: wallet.balance + p.income + p.amount,
        remark: `Final Package of $${p.amount + p.income} income and Capital return paid`,
        user: p.user.id,
        userId: p.user.id
      };
      await this.walletService.create(ledger);
      await this.packageService.update(p.user.id, {count, status: 'matured'});
      // Pay StakeHolder
      if(userWhoReferredYou){
        let ledger: CreateWalletDto;
        const commission = p.income * 0.03
        if(userWhoReferredYou.role === 'stakeholder') {
          ledger = {
            debit: 0,
            credit: commission,
            balance: walletReferral.balance + commission,
            remark: `Monthly commission of $${commission} interest paid`,
            userId: userWhoReferredYou.id,
            user: userWhoReferredYou.id
          };
          await this.walletService.create(ledger);
        }
      }
      //TODO
      //SEND NOTIFICATION
    }else if(p.income > 0 && p.count < count) {
      const ledger = {
        debit: 0,
        credit: p.income,
        balance: wallet.balance + p.income,
        remark: `Monthly Packaged interest of $${p.income} paid`,
        user: p.user.id,
        userId: p.user.id
      };
      await this.walletService.create(ledger);
       //TODO
      //SEND NOTIFICATION
      // Pay StakeHolder & User
      if(userWhoReferredYou){
        let ledger: CreateWalletDto;
        const commission = p.income * 0.03
        if(userWhoReferredYou.role === 'stakeholder') {
          ledger = {
            debit: 0,
            credit: commission,
            balance: walletReferral.balance + commission,
            remark: `Monthly commission of $${commission} interest paid`,
            userId: userWhoReferredYou.id,
            user: userWhoReferredYou.id
          };
          await this.walletService.create(ledger);
  
        }else if(count === 1 && userWhoReferredYou.role === 'user') {
          ledger = {
            debit: 0,
            credit: commission,
            balance: walletReferral.balance + commission,
            remark: `Monthly commission of $${commission} interest paid`,
            userId: userWhoReferredYou.id,
            user: userWhoReferredYou.id
          };
        await this.walletService.create(ledger);
        }
      }
    }
    await this.packageService.update(p.user.id, {count});

    }
  }

  date_diff_indays(currentDate: string|Date, futureDate: string|Date) {
    const now = new Date(currentDate);
    const future = new Date(futureDate);
    return Math.floor(
      (Date.UTC(future.getFullYear(), future.getMonth(), future.getDate()) -
        Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())) /
        (1000 * 60 * 60 * 24)
    );
  }
  
}



