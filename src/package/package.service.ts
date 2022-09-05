import { Injectable,} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository, } from 'typeorm';
import { CreatePackageDto } from './dto/create_package.dto';
import { Package } from './package.entity';


@Injectable()
export class PackageService {
  constructor(@InjectRepository(Package) private repo: MongoRepository<Package>) {

  }

  async save(body: CreatePackageDto) {         
        const packageCreate = this.repo.create(body);
        return await this.repo.save(packageCreate)
  }

  
async find(options?: {status: string}) {     
    const {status} = options || {}
    let packages: Package[] = []
    if(!status) {
      packages = await this.repo.find();
      return packages;
    }
    packages = await this.repo.find({
      where: {status},
      relations: {
        user: true
      }
    });
    return packages
  }

async findAllByUser(userId: string) {         
    const packages = await this.repo.find({where: {userId}});
    return packages;
  }

async findOne(id: string) {
  if(!id) {
    return null
  }     
  const packageFound = await this.repo.findOne({where: {id}});
  return packageFound;
}

  subscribePlan(body: CreatePackageDto) {
    let result: CreatePackageDto | null = null
    if(body.amount >= 100 && body.amount <= 500 ) {
        result['plan'] = 'silver'
        result['amount'] = body.amount
        result['interest'] = this.getInterest(body.amount, body.duration),
        result['amount'] = body.amount
    }else if(body.amount >= 600 && body.amount <= 1000){
        result['plan'] = 'gold'
        result['amount'] = body.amount
        result['interest'] = this.getInterest(body.amount, body.duration)
        result['duration'] = body.duration
    }else if(body.amount >= 1100 && body.amount <= 5000) {
        result['plan'] = 'platinum'
        result['amount'] = body.amount
        result['interest'] = this.getInterest(body.amount, body.duration)
        result['duration'] = body.duration
    }
    return result
  }
 
  getInterest(amount: number, duration: number) {
      let interest = 0;
      if (duration == 3) {
        // 3 Month package
        if (amount >= 100 && amount <= 500) {
          interest = 10 / 100; //silver package
        } else if (amount >= 600 && amount <= 1000) {
          interest = 11 / 100; //gold package
        } else if (amount >= 1100 && amount <= 5000) {
          interest = 12 / 100; // platinum package
        }
      } else if (duration == 6) {
        if (amount >= 100 && amount <= 500) {
          interest = 11 / 100; //silver package
        } else if (amount >= 600 && amount <= 1000) {
          interest = 12 / 100; //gold package
        } else if (amount >= 1100 && amount <= 5000) {
          interest = 13 / 100; //platinum package
        }
      } else if (duration == 12) {
        if (amount >= 100 && amount <= 500) {
          interest = 13 / 100; //silver package
        } else if (amount >= 600 && amount <= 1000) {
          interest = 14 / 100; //gold package
        } else if (amount >= 1100 && amount <= 5000) {
          interest = 15 / 100; //platinum package
        }
      }
    
      return interest;
  }

  setSubscriptionPlanToPackage(subscription: CreatePackageDto, id: string) {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + subscription.duration);
    const packagePlan = {
          plan: subscription.plan,
          interest:subscription.interest,
          duration: subscription.duration,
          amount: subscription.amount,
          count: 0,
          income: 0,
          endDate: futureDate,
          user: id,
      }
    return packagePlan
  }

  async update(id: string, attrs: Partial<Package>) {
    const packageFound = await this.findOne(id);
    if (!packageFound) {
      throw new Error('package not found');
    }
    Object.assign(packageFound, attrs);
    return this.repo.save(packageFound);
  }
}
