// src/topping/topping.controller.ts
import { Controller, Post, Get, Body } from '@nestjs/common';
import { ToppingService } from './topping.service';
import { CreateToppingDto } from './dto/create-topping.dto';

@Controller('topping')
export class ToppingController {
  constructor(private toppingService: ToppingService) { }

  @Post()
  async createTopping(@Body() createToppingDto: CreateToppingDto) {
    return this.toppingService.createTopping(createToppingDto);
  }

  @Get()
  async getAllToppings() {
    return this.toppingService.getAllToppings();
  }
}
