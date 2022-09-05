import {
    Body,
    Controller,
    Post,
  } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AnouncementService } from './anouncement.service';
import { CreateAnouncementDto } from './dto/create_anouncement.dto';

@ApiTags('Anouncement')
@Controller('/anouncement')
export class AnouncementController {
    constructor(
        private anouncementService: AnouncementService, 
         ) {}
  
    @Post()
    async create(@Body() body: CreateAnouncementDto) {
        const anouncement = await this.anouncementService.save(body);
        return anouncement;
    }



}