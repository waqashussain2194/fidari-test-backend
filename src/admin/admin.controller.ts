import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { AdminSignupDto } from './dto/admin-signup.dto';
import { AdminLoginDto } from './dto/admin-login.dto';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateCustomerDto } from 'src/customer/dto/create-customer.dto';
import { CustomerService } from 'src/customer/customer.service';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly authService: AuthService,
    private readonly customerService: CustomerService
  ) { }

  @Post('signup')
  @ApiResponse({ status: 200, description: 'Admin signup successful.' })
  async signup(@Body() signupDto: AdminSignupDto) {
    return this.authService.signup({ ...signupDto });
  }

  @UseGuards(LocalAuthGuard)
  @ApiBearerAuth()
  @Post('login')
  @ApiResponse({ status: 200, description: 'Admin login successful.' })
  async login(@Body() loginDto: AdminLoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Customer creation successful.' })
  @Post('create-customer')
  async createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.createCustomer(createCustomerDto);
  }
}
