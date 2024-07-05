// src/cart/cart.controller.ts
import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Role } from '@prisma/client';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) { }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.CUSTOMER)
  @ApiBearerAuth()
  @Post('add')
  async addToCart(@Req() req: any, @Body() addToCartDto: AddToCartDto) {
    const userId = req.user['id'];
    return this.cartService.addToCart(userId, addToCartDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserCart(@Req() req: any) {
    const userId = req.user['id'];
    return this.cartService.getUserCart(userId);
  }
}
