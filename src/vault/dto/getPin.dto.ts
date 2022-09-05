import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetPinDto {

  @IsNumber()
  pin: number;

  @IsString()
  @IsOptional()
  user: string;

}
