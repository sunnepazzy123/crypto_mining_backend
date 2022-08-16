import { Injectable, NotFoundException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoinBaseService } from 'src/coinbase/coinbase.service';
import { MongoRepository, } from 'typeorm';
import { CreateInvoiceDto } from './dto/invoice.dto';
import { Invoice } from './invoice.entity';


@Injectable()
export class InvoiceService {
  constructor(@InjectRepository(Invoice) private repo: MongoRepository<Invoice>, private coinbase: CoinBaseService) {

  }

  async create(body: CreateInvoiceDto) {  
    const charge = {
        name: body.name,
        description: body,
        local_price: {
          amount: body.local_price.amount,
          currency: body.local_price.currency,
        },
        pricing_type: body.pricing_type,
    }

    const invoice = await this.coinbase.createCharge(charge); 

    const newInvoice = {
        userId: body.userId,
        email: body.email,
        coinbaseCode: invoice.code,
        amount: body.local_price.amount,
        remark: body.description,
        status: 'created',
        invoiceId: invoice.id
    }
    const invoiceCreate = this.repo.create(newInvoice)
    return this.repo.save(invoiceCreate);
  }

  findOne(invoiceId: string) {   
    const reciept = this.repo.findOne({
        where: {
          invoiceId,
          }
    });
    if (!reciept) {
      throw new NotFoundException('Invoice not found');
    }
    return reciept;
  }

}
