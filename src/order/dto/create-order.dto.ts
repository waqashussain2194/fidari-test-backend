// src/order/dto/create-order.dto.ts

import { IsArray, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsArray()
  @IsNotEmpty()
  pizzas: { id: number; name: string; toppings: { id: number; name: string }[] }[];
}
