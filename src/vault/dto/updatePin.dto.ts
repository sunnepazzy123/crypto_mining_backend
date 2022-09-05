import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class UpdatePinDto {

  @IsOptional()
  @IsString()
  user: string

  @IsNumber()
  oldPin: number

  @IsNumber()
  pin: number;

  @IsNumber()
  confirmPin: number;

}
