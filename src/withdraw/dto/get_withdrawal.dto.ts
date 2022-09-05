import {IsString } from 'class-validator';

export class GetWithdrawalDto {
  @IsString()
  user: string
}
