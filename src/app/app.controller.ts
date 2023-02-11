import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorator/user.decorator';
import { User, UserType } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RoleGuard } from '../auth/guard/role.guard';
import { Roles } from '../auth/decorator/role.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Roles(UserType.CONSUMER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiBearerAuth()
  async getHello(@CurrentUser() user: User): Promise<string> {
    return user.id;
  }
}
