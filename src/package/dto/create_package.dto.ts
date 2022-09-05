import {  IsNumber, IsPositive, IsString, Min,  } from "class-validator";

export class CreatePackageDto {

    @IsPositive()
    @Min(100)
    amount: number

    @IsPositive()
    @Min(3)
    duration: number

    @IsString()
    plan: string

    @IsNumber()
    interest: number
}