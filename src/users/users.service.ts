import { Injectable, NotFoundException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReferralService } from 'src/referral/referral.service';
import { WalletService } from 'src/wallet/wallet.service';
import { Repository, } from 'typeorm';
import { CreateUserDto } from './dto/create_user.dto';
import { User } from './users.entity';
import { UserEntityAttrDto } from './dto/user_entity_attr_dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private walletService: WalletService,
    private referralService: ReferralService,
    ) {}

  async save(body: CreateUserDto) {
    const user = this.repo.create(body);
    const newUser = await this.repo.save(user);
    const walletLedger = {
      debit: 0,
      credit: 0,
      balance: 0,
      remark: 'Wallet created',
      user: newUser.id,
      userId: newUser.id
    };
    await this.walletService.create(walletLedger);

    if(body.referredBy) {
      const referral = {
        user: newUser.id,
        userId: newUser.id,
        referredBy: body.referredBy
      };
      await this.referralService.save(referral);
    }

    return newUser;
  }

  async find() {
    return await this.repo.find({
      relations: {
        referral: true
      }
    });
  }

  async findOne(id: string) {
    if (!id) {
      return null;
    }
    try {
       return await this.repo.findOne({ where: { id } });
    } catch (_) {
      throw new NotFoundException('Invalid Id')
    }

  }

  findByAttributes(body: UserEntityAttrDto) {
    return this.repo.findOne({ where: body });
  }

  async update(id: string, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('user not found');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user no found');
    }
    return this.repo.remove(user);
  }


}