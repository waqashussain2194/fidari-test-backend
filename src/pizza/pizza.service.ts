import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePizzaDto } from './dto/create-pizza.dto';

@Injectable()
export class PizzaService {
  constructor(private prisma: PrismaService) { }

  async createPizza(data: CreatePizzaDto) {
    const toppings = await this.prisma.topping.findMany({
      where: { name: { in: data.toppings } },
    });

    if (!toppings || toppings.length !== data.toppings.length) {
      throw new HttpException('Toppings not found', HttpStatus.NOT_FOUND);
    }

    return this.prisma.pizza.create({
      data: {
        name: data.name,
        toppings: {
          connect: toppings.map((topping) => ({ id: topping.id })),
        },
      },
    });
  }

  async getAllPizzas() {
    return this.prisma.pizza.findMany({
      include: { toppings: true },
    });
  }
}
