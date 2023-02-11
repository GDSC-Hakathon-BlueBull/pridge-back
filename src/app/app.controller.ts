import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorator/user.decorator';
import { User } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getHello(@CurrentUser() user: User): Promise<string> {
    return user.id;
  }
}
