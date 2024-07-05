import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength, Matches } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'Current password must be at least 8 characters long' })
  @ApiProperty({ example: 'abc123@' })
  currentPassword: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'New password must be at least 8 characters long' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, { message: 'New password too weak' })
  @ApiProperty({ example: 'def456@' })
  newPassword: string;
}
