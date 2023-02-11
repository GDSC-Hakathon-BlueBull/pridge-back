import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiProperty } from '@nestjs/swagger';
import { RegisterConsumerPayload } from './payload/register-consumer.payload';
import { RegisterDonatorPayload } from './payload/register-donator.payload';
import { LoginPayload } from './payload/login.payload';

@Controller('auth')
export class AuthController {
  @Post('register/consumer')
  @ApiOperation({
    description: 'register for consumer user',
  })
  async registerConsumer(
    @Body() payload: RegisterConsumerPayload,
  ): Promise<void> {
    return;
  }

  @Post('register/donator')
  @ApiOperation({
    description: 'register for donator user',
  })
  async registerDonator(
    @Body() payload: RegisterDonatorPayload,
  ): Promise<void> {
    return;
  }

  @Post('login')
  @ApiOperation({
    description: 'login',
  })
  async login(@Body() payload: LoginPayload) {
    return;
  }
}
