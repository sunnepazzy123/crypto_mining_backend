import {
  BadRequestException,
    Body,
    Controller,
    Post,
    Req,
    UseGuards,
  } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HelpersService } from 'src/helpers/helpers.service';
import { JwtAuthGuard } from 'src/users/strategy/jwt.auth.guard';
import { CreatePinDto } from './dto/createPin.dto';
import { UpdatePinDto } from './dto/updatePin.dto';
import { VaultService } from './vault.service';


@ApiTags('Vault') 
@Controller('/vault')
// @Serialize(UserDto)
@UseGuards(JwtAuthGuard)
export class VaultController {
    constructor(
      private vaultService: VaultService,
      private helpersService: HelpersService,
    ) {}

    @Post('/get_pin')
    async getPin(@Body() body: UpdatePinDto, @Req() req: any) {
      const mergedBody = this.helpersService.mergeObject(body, {user: req.user as string})
      const pinUpdated = await this.vaultService.getPin(mergedBody);
      return pinUpdated;
    }

    @Post('/create_pin')
    async createPin(@Body() body: CreatePinDto, @Req() req: any) {
      if(body.pin != body.confirmPin) {
        throw new BadRequestException('pin and confirm pin not correct')
      }
      const mergedBody = this.helpersService.mergeObject(body, {user: req.user as string})
      const pinCreated = await this.vaultService.createPin(mergedBody);
      return pinCreated;
    }

    @Post('/update_pin')
    async updatePin(@Body() body: UpdatePinDto, @Req() req: any) {
      const mergedBody = this.helpersService.mergeObject(body, {user: req.user as string})
      const pinUpdated = await this.vaultService.updatePin(mergedBody);
      return pinUpdated;
    }
  
  }
  