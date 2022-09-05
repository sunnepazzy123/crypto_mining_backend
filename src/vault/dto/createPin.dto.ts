import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePinDto {

  @IsNumber()
  pin: number;

  @IsNumber()
  confirmPin: number;

  @IsString()
  @IsOptional()
  user: string;

}
