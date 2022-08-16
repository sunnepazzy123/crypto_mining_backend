import {
    Body,
    Controller,
    Post,

    Headers,
  } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CoinBaseService } from 'src/coinbase/coinbase.service';
import { Invoice } from 'src/invoice/invoice.entity';
import { InvoiceService } from 'src/invoice/invoice.service';
import { WalletService } from 'src/wallet/wallet.service';
import { DepositService } from './deposit.service';

@Controller('/deposit')
export class DepositController {
    constructor(
        private coinbaseService: CoinBaseService, 
        private invoiceService: InvoiceService,
        private walletService: WalletService,
        private depositService: DepositService,
         ) {}
  
    @Post()
    async create(@Body() body: any, @Headers('x-cc-webhook-signature') header: any) {

        const event = this.coinbaseService.event(body, header)
        let invoice: Invoice
        if(event.type === 'charge:confirmed') {
            invoice = await this.invoiceService.findOne(event.data.id);
            if(invoice.status === 'created'){
                const wallet = await this.walletService.findOne(invoice.userId)
                const walletLedger = {
                        debit: 0,
                        credit: invoice.amount,
                        balance: wallet.balance + invoice.amount,
                        reference: invoice.code,
                        remark: `Alert Deposit of $${invoice.amount} to fund Wallet`,
                        user: invoice.userId,
                    };
            await this.walletService.create(walletLedger);
            invoice.status = 'success';
            await invoice.save();
    
            const depositSlip = {
                        userId: invoice.userId,
                        amount: invoice.amount,
                        type: "USD",
                        status: "success",
                        reference: invoice.code,
                        remark: `Alert Deposit of $${invoice.amount} to fund Wallet`,          
                        }
            await this.depositService.create(depositSlip);
            // const message = `<h2>Fund your Wallet from ${this.configService.get('COMPANY_NAME')}</h2>
            //         <p>Alert Deposit !!! of $${invoice.amount} from ${this.configService.get('COMPANY_NAME')}.</p>`;
            // const subject = "Alert Deposit";
            // sending mails
            // sendMailer(process.env.Email, process.env.PasswordEmail, coinBestPayment.email, message, subject);
            }
        }

        return {
            id: event.id,
            type: event.type,
            status: event.type,        
        }
    }



}