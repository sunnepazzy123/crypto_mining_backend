import { Type } from "class-transformer";
import {  IsPositive, IsString } from "class-validator";

export class LocalPriceDto {
    @IsPositive()
    amount: number

    @IsString()
    currency: string
}


export class CreateInvoiceDto {

    @IsString()
    name: string

    @IsString()
    userId: string

    @IsString()
    description: string

    @IsString()
    email: string

    @Type(() => LocalPriceDto)
    local_price: LocalPriceDto

    @IsString()
    pricing_type: string

}