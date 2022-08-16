import { IsPositive, IsString } from "class-validator";

export class CreateReferralDto {
    @IsString()
    userId: string;

    @IsString()
    referredById: string;

}