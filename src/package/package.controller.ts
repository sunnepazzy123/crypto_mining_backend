import {
    Body,
    Controller,
    Get,
    NotAcceptableException,
    NotFoundException,
    Param,
    Post,
    Req,
    UseGuards,
  } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/users/strategy/jwt.auth.guard';
import { CreatePackageDto } from './dto/create_package.dto';
import { PackageService } from './package.service';

@UseGuards(JwtAuthGuard)
@ApiTags('Packages')
@Controller('/packages')
// @Serialize(UserDto)
export class PackageController {
    constructor(private packageService: PackageService) {}

    // @UseGuards(PackageGuard)
    @Post()
    async create(@Body() body: CreatePackageDto, @Req() req: any) {
      const subscriptionPlan = this.packageService.subscribePlan(body);
      if(!subscriptionPlan){
        throw new NotAcceptableException('Invalid Limit');
      }
      const setSubscribePackage = this.packageService.setSubscriptionPlanToPackage(subscriptionPlan, req.user.id)
      return await this.packageService.save(setSubscribePackage)
    }

    @Get('/all')
    async find() {
      const packages = await this.packageService.find();
      return packages
    }

    @Get()
    async findAllByUser(@Req() req: any) {
      const id = req.user.id
      const packages = await this.packageService.findAllByUser(id);
      return packages
    }

  // @UseInterceptors(new CustomSerializerInterceptor(UserDto))
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    const packageFound = await this.packageService.findOne(id);
    if (!packageFound) {
      throw new NotFoundException('Package not found');
    }
    return packageFound;
  }

  }
  