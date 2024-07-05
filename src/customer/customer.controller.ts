import { Controller, Post, Body, UseGuards, ValidationPipe, Put, Req } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { CustomerLoginDto } from './dto/customer-login.dto';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { CustomerService } from './customer.service';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from '@prisma/client';


@Controller('customer')
export class CustomerController {
  constructor(
    private authService: AuthService,
    private customerService: CustomerService
  ) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiResponse({ status: 200, description: 'Customer login successful.' })
  async login(@Body() loginDto: CustomerLoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.CUSTOMER)
  @ApiBearerAuth()
  @Put('password')
  @ApiResponse({ status: 200, description: 'Password updated successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async updatePassword(@Req() req: any, @Body() updatePasswordDto: UpdatePasswordDto) {
    const userId = req.user['id']
    await this.customerService.updatePassword(userId, updatePasswordDto);
    return { message: 'Password updated successfully' };
  }
}
