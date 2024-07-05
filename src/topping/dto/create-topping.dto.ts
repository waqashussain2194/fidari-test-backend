import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateToppingDto {
  @ApiProperty({ example: 'Cheese', description: 'The name of the topping' })
  @IsString()
  name: string;
}
