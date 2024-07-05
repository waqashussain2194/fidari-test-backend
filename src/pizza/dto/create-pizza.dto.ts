import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreatePizzaDto {
  @ApiProperty({ example: 'Fajita', description: 'The name of the pizza' })
  @IsString()
  name: string;

  @ApiProperty({
    example: ['Cheese', 'Pepperoni', 'Mushrooms'],
    description: 'List of toppings for the pizza',
    isArray: true,
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  toppings: string[];
}
