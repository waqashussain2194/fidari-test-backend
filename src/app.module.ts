import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { APP_PIPE } from '@nestjs/core';
import { AdminModule } from './admin/admin.module';
import { CustomerModule } from './customer/customer.module';
import { JwtModule } from '@nestjs/jwt';
import { PizzaModule } from './pizza/pizza.module';
import { ToppingModule } from './topping/topping.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PrismaModule,
    AdminModule,
    CustomerModule,
    PizzaModule,
    ToppingModule,
    CartModule,
    OrderModule
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ]
})
export class AppModule { }
