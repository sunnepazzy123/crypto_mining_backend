import { IsNumber, IsOptional, IsString } from 'class-validator';

export class WithdrawUserDto {
  @IsNumber()
  amount: number;

  @IsNumber()
  pin: number;

  @IsString()
  user: string;

  @IsString()
  userId: string;
}
