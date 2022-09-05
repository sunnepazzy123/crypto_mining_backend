import { IsString } from "class-validator";

export class CreateAnouncementDto {
    @IsString()
    user: string;

    @IsString()
    userId: string;

    @IsString()
    text: string;
  
    @IsString()
    subject: string;
}