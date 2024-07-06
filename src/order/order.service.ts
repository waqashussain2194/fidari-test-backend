// src/order/order.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) { }

  async createOrder(createOrderDto: CreateOrderDto) {
    const { userId, pizzas } = createOrderDto;

    const order = await this.prisma.order.create({
      data: {
        userId,
        pizzas: {
          create: pizzas.map(pizza => ({
            name: pizza.name,
            toppings: {
              create: pizza.toppings.map(topping => ({
                toppingId: topping.id,
              })),
            },
          })),
        },
      },
      include: {
        pizzas: {
          include: {
            toppings: true,
          },
        },
      },
    });

    return order;
  }
}
