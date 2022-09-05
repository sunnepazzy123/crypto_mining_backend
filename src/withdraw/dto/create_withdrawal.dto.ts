import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateWithdrawalDto {
  @IsNumber()
  amount: number;

  @IsNumber()
  pin: number;

  @IsString()
  @IsOptional()
  user: string
}
