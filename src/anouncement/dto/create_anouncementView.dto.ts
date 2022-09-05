import { IsString } from "class-validator";

export class CreateAnouncementViewDto {
    @IsString()
    user: string;

    @IsString()
    userId: string;
}