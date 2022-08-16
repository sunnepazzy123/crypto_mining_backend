import { IsPositive, IsString } from "class-validator";

export class CreateDepositDto {
    @IsString()
    userId: string;

    @IsPositive()
    amount: number;
  
    @IsString()
    reference: string;
   
    @IsString()
    remark: string;

    @IsString()
    type: string;

}