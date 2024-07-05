// src/cart/cart.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) { }

  async addToCart(userId: number, addToCartDto: AddToCartDto) {
    return this.prisma.cartItem.create({
      data: {
        userId,
        pizzaId: addToCartDto.pizzaId,
      },
    });
  }

  async getUserCart(userId: number) {
    return this.prisma.cartItem.findMany({
      where: { userId },
      include: { pizza: { include: { toppings: true } } },
    });
  }
}
