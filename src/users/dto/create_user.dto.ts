import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({description: 'email' , example: 'ayo@gmail.com'})
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({description: 'password' , example: 'password'})
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({description: 'firstName' , example: 'sunday'})
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({description: 'lastName' , example: 'odibo'})
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({description: 'username' , example: 'sunjo123'})
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiPropertyOptional({description: 'referredBy' , example: 'sunking',})
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  referredBy: string;
}
