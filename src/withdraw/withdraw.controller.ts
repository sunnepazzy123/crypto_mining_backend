import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    UseGuards,
  } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { HelpersService } from 'src/helpers/helpers.service';
import { JwtAuthGuard } from 'src/users/strategy/jwt.auth.guard';
import { CreateWithdrawalDto } from './dto/create_withdrawal.dto';
import { WithDrawService } from './withdraw.service';

@ApiHeader({
  name: 'X-MyHeader',
  description: 'Custom header',
})
@ApiTags('Withdraw')
@Controller('/withdraw')
// @Serialize(UserDto)
@UseGuards(JwtAuthGuard)
export class WithDrawController {
    constructor(
      private withdrawService: WithDrawService,
      private helpersService: HelpersService,
    ) {}


    @Get('/list')
    async list(@Req() req: any) {
        return await this.withdrawService.find({user: req.user.id as string})
    }

    @Get('/list_all')
    async listAll() {
        return await this.withdrawService.findAll();
    }

    @Post('/create_withdrawal')
    async createWithdrawal(@Body() body: CreateWithdrawalDto) {
      const mergedBody = this.helpersService.mergeObject(body, {user: body.user as string})
      // const withdrawal = this.withdrawService.create(mergedBody)
      return {};
    }

  
  }
  