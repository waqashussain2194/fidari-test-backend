import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CustomerService } from 'src/customer/customer.service';

@Module({
  controllers: [AdminController],
  providers: [AdminService, AuthService, JwtService, PrismaService, CustomerService]
})
export class AdminModule { }
