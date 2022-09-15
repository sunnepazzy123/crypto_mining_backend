import { BadRequestException, Injectable, Req, } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository, } from 'typeorm';
import { CreatePinDto, } from './dto/createPin.dto';
import { UpdatePinDto } from './dto/updatePin.dto';
import { Vault } from './vault.entity';
import { TokenDto } from './dto/token.dto';
import { GetPinDto } from './dto/getPin.dto';


@Injectable()
export class VaultService {
  constructor(
    @InjectRepository(Vault) private repo: MongoRepository<Vault>,
    private jwtService: JwtService,
    ) {}

    async getPin(body: GetPinDto) {
      return await this.repo.findOne({
      where: {pin: body.pin, userId: body.user}
    });
    }

  async createPin(body: CreatePinDto) {
    if(body.pin != body.confirmPin) {
      throw new BadRequestException('pin and confirm pin not correct')
    }
    const vault = await this.repo.findOne({
      where: {userId: body.user}
    });

    if(vault) {
      throw new BadRequestException('Pin already created')
    }
    const pin = {
      user: body.user,
      pin: body.pin,
    }
    const vaultEntity= this.repo.create(pin);
    return await this.repo.save(vaultEntity);
  }

  
  async updatePin(body: UpdatePinDto) {
    const vault = await this.repo.findOne({where: {userId: body.user}});
    if(!vault) {
      throw new BadRequestException('Vault not found')
    }
    if(vault.pin != body.oldPin) {
      throw new BadRequestException('old pin not correct')
    }
    Object.assign(vault, {pin: body.pin});
    const updatedVault = await this.repo.save(vault);
    return updatedVault;
  }

  async generateToken(body: TokenDto) {
    const payload = {
            id: body.id,
            role: body.role,
          }
    return await this.jwtService.signAsync(payload)
  }

  async decodeToken(token: string) {
    return this.jwtService.decode(token)
  }

  async verifyToken(token: string) {
    return await this.jwtService.verifyAsync(token)
  }
}