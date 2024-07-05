import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    PrismaModule
  ],
  controllers: [CustomerController],
  providers: [CustomerService, AuthService, JwtService]
})
export class CustomerModule { }
