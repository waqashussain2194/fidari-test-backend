import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Role, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) { }

  async createCustomer(data: CreateCustomerDto): Promise<Omit<User, 'password'>> {
    try {
      const password = crypto.randomBytes(8).toString('hex');
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await this.prisma.user.create({
        data: {
          ...data,
          password: hashedPassword,
          role: Role.CUSTOMER,
        },
      });

      const { password: _, ...result } = user;

      // Optionally, send the generated password to the customer via email or other means
      // this.emailService.sendPasswordToUser(data.email, password);
      console.log(`Generated password for ${data.email}: ${password}`); // For debugging purposes

      return result;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException('Email already exists');
      } else {
        throw new InternalServerErrorException('An error occurred while creating the user');
      }
    }
  }

  async updatePassword(userId: string, updatePasswordDto: UpdatePasswordDto): Promise<void> {
    const { currentPassword, newPassword } = updatePasswordDto;

    const user = await this.prisma.user.findUnique({ where: { id: +userId } });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      throw new BadRequestException('Current password is incorrect');
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await this.prisma.user.update({
      where: { id: +userId },
      data: { password: hashedNewPassword },
    });
  }
}
