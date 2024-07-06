import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import { PizzaService } from './pizza.service';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from '@prisma/client';

@Controller('pizza')
export class PizzaController {
  constructor(private pizzaService: PizzaService) { }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.CUSTOMER)
  @ApiBearerAuth()
  @Post()
  async createPizza(@Req() req: any, @Body() createPizzaDto: CreatePizzaDto) {
    const userId = req.user['id'];
    return this.pizzaService.createPizza(userId, createPizzaDto);
  }

  @Get()
  async getAllPizzas() {
    return this.pizzaService.getAllPizzas();
  }
}
