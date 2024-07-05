import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateToppingDto } from './dto/create-topping.dto';

@Injectable()
export class ToppingService {
  constructor(private prisma: PrismaService) { }

  async createTopping(data: CreateToppingDto) {
    return this.prisma.topping.create({
      data,
    });
  }

  async getAllToppings() {
    return this.prisma.topping.findMany();
  }
}
