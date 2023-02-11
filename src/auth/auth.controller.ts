import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiProperty } from '@nestjs/swagger';
import { RegisterConsumerPayload } from './payload/register-consumer.payload';
import { RegisterDonatorPayload } from './payload/register-donator.payload';
import { LoginPayload } from './payload/login.payload';
import { TokenDto } from './dto/token.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register/consumer')
  @ApiOperation({
    description: 'register for consumer user',
  })
  async registerConsumer(
    @Body() payload: RegisterConsumerPayload,
  ): Promise<TokenDto> {
    return this.authService.registerConsumer(payload);
  }

  @Post('register/donator')
  @ApiOperation({
    description: 'register for donator user',
  })
  async registerDonator(
    @Body() payload: RegisterDonatorPayload,
  ): Promise<TokenDto> {
    return this.authService.registerDonator(payload);
  }

  @Post('login')
  @ApiOperation({
    description: 'login',
  })
  async login(@Body() payload: LoginPayload): Promise<TokenDto> {
    return {} as any;
  }
}
