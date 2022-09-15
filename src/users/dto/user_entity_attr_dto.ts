import { IsEmail, IsOptional, IsString } from 'class-validator';


export class UserEntityAttrDto {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  id: string;
}



