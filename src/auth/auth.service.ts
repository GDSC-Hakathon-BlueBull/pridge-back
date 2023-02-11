import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { RegisterConsumerPayload } from './payload/register-consumer.payload';
import { RegisterDonatorPayload } from './payload/register-donator.payload';
import { RegisterDonatorData } from './type/register-donator.data';
import { RegisterConsumerData } from './type/register-consumer.type';
import { JwtService } from '@nestjs/jwt';
import { TokenDto } from './dto/token.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async registerConsumer(payload: RegisterConsumerPayload): Promise<TokenDto> {
    const registerData: RegisterConsumerData = {
      uid: 'kk',
      name: payload.name,
      birthday: payload.birthday,
      email: payload.email,
      photo: payload.photo,
      country: payload.country,
      address: {
        country: payload.address.country,
        code: payload.address.code,
        city: payload.address.city,
        street: payload.address.street,
        detail: payload.address.detail,
        firstName: payload.address.firstName,
        lastName: payload.address.lastName,
      },
    };

    await this.authRepository.registerConsumer(registerData);
    const accessToken = await this.generateAccessToken('kk');
    return {
      accessToken,
    };
  }

  async registerDonator(payload: RegisterDonatorPayload): Promise<TokenDto> {
    const registerData: RegisterDonatorData = {
      uid: 'kk',
      name: payload.name,
      birthday: payload.birthday,
      email: payload.email,
      photo: payload.photo,
      country: payload.country,
      job: payload.job,
      gender: payload.gender,
    };

    await this.authRepository.registerDonator(registerData);
    const accessToken = await this.generateAccessToken('kk');
    return {
      accessToken,
    };
  }

  async login(token: string): Promise<void> {
    return;
  }

  private async generateAccessToken(userId: string): Promise<string> {
    return this.jwtService.signAsync(
      { userId: userId },
      {
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRE,
      },
    );
  }
}
