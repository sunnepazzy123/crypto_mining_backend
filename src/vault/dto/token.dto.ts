import { IsString } from 'class-validator';

export class TokenDto {
  @IsString()
  id: string;

  @IsString()
  email: string;

  @IsString()
  username: string
  
  @IsString()
  role?: string

}
