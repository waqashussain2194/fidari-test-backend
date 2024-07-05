import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CustomerLoginDto {
  @ApiProperty({ example: 'customer4@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Amperor2598@' })
  @IsString()
  @MinLength(8)
  password: string;
}
