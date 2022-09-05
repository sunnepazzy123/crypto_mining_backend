import {
    Controller,
    Get,
    NotFoundException,
    Param,
    Req,
    UseGuards,
  } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminAuthGuard } from 'src/guards/admin.guard';
import { JwtAuthGuard } from 'src/users/strategy/jwt.auth.guard';
import { WalletService } from './wallet.service';

@UseGuards(JwtAuthGuard)
@ApiTags('Wallet')
@Controller('wallet')
export class WalletController {
    constructor(
      private walletService: WalletService,
    ) {}
  
  // @UseGuards(WalletGuard)
  @Get('/')
  async findAll(@Req() req: any) {
    const user = req.user.id as string
    const wallet = await this.walletService.findAll(user);
    return wallet;
  }

  @UseGuards(AdminAuthGuard)
  @Get('/all')
  async find() {
    const wallets = await this.walletService.find();
    return wallets
  }

  // @UseInterceptors(new CustomSerializerInterceptor(UserDto))
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    const wallet = await this.walletService.findOne(id);
    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }
    return wallet;
  }

  @Get('/get_balance')
  async getBalance(@Req() req: any) {
    const user = req.user.id
    const wallet = await this.walletService.getLastWallet(user);
    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }
    return wallet;
  }
   
  }
  