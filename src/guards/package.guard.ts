import { CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { WalletService } from 'src/wallet/wallet.service';


export class PackageGuard implements CanActivate {

 constructor(@Inject(WalletService) private walletService: WalletService) {

 }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { id } = request.user || {}
    if(!id) return false
    const wallet = await this.walletService.getLastWallet(id);
    const balance = wallet.balance >= 100 ? true : false;
    return balance;
  }

}
