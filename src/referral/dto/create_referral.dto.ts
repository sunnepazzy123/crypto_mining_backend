import { IsString } from "class-validator";

export class CreateReferralDto {
    @IsString()
    user: string;

    @IsString()
    referredBy: string;

}