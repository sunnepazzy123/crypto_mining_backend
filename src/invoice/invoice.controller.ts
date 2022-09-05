import {
    Body,
    Controller,
    Post,
    Session,
  } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InvoiceService } from 'src/invoice/invoice.service';
import { LocalPriceDto } from './dto/invoice.dto';

@ApiTags('Invoice')
@Controller('/invoice')
// @Serialize(UserDto)
export class InvoiceController {
    constructor(private invoiceService: InvoiceService) {}
  
    @Post()
    async create(@Body() body: LocalPriceDto, @Session() session: any) {
      const charge = {
        name: 'Fund Your Wallet',
        description: 'Deposit Payment Method',
        email: session.user.email,
        userId: session.user._id,
        local_price: {
            amount: body.amount,
            currency: 'USD',
          },
        pricing_type: 'fixed_price'    
      }
   
      const reciept = await this.invoiceService.create(charge);
      return reciept;
    }

   
  }
  