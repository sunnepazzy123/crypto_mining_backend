import { IsString } from 'class-validator';

export class SendMailDto {

  @IsString()
  html: string;

  @IsString()
  from: string;

  @IsString()
  subject: string;

  @IsString()
  to: string;


}
