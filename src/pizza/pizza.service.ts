import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePizzaDto } from './dto/create-pizza.dto';

@Injectable()
export class PizzaService {
  constructor(private prisma: PrismaService) { }

  async createPizza(userId: number, data: CreatePizzaDto) {
    try {
      const toppings = await this.prisma.topping.findMany({
        where: { id: { in: data.toppings } },
      });
  
      if (!toppings || toppings.length !== data.toppings.length) {
        throw new HttpException('Toppings not found', HttpStatus.NOT_FOUND);
      }
  
      const pizza = await this.prisma.pizza.create({
        data: {
          name: data.name,
          toppings: {
            connect: toppings.map((topping) => ({ id: topping.id })),
          },
        },
      });
  
      await this.prisma.cartItem.create({
        data: {
          userId,
          pizzaId: pizza.id,
        },
      });
  
      return pizza;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error; // Re-throw known HTTP exceptions
      }
      console.error('Error creating pizza:', error);
      throw new HttpException(
        'An error occurred while creating the pizza',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllPizzas() {
    return this.prisma.pizza.findMany({
      include: { toppings: true },
    });
  }
}
