import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreateWalletDto {
  @Expose()
  @IsNumber()
  debit: number;

  @Expose()
  @IsNumber()
  credit: number;

  @Expose()
  @IsNumber()
  balance: number;

  @Expose()
  @IsString()
  remark: string;

  @Expose()
  @IsString()
  userId: string

  @Expose()
  @IsString()
  user: string

}
