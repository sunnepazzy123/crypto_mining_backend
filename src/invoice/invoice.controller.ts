import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
    Put,
    Query,
    Req,
    Session,
    Headers,
    UseGuards,
  } from '@nestjs/common';
import { InvoiceService } from 'src/invoice/invoice.service';
import { LocalPriceDto } from './dto/invoice.dto';


@Controller('/invoice')
// @Serialize(UserDto)
export class InvoiceController {
    constructor(private recieptService: InvoiceService) {}
  
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
   
      const reciept = await this.recieptService.create(charge);
      return reciept;
    }

   
  }
  