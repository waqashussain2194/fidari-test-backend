import { Module } from '@nestjs/common';
import { ToppingController } from './topping.controller';
import { ToppingService } from './topping.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ToppingController],
  providers: [ToppingService, PrismaService]
})
export class ToppingModule { }
