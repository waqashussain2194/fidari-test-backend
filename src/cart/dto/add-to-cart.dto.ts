import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class AddToCartDto {
  @ApiProperty({ example: '1', description: 'The ID of the pizza' })
  @IsInt()
  pizzaId: number;
}
