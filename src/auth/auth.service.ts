import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { RegisterConsumerPayload } from './payload/register-consumer.payload';
import { RegisterDonatorPayload } from './payload/register-donator.payload';
import { RegisterDonatorData } from './type/register-donator.data';
import { RegisterConsumerData } from './type/register-consumer.type';
import { JwtService } from '@nestjs/jwt';
import { TokenDto } from './dto/token.dto';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
    @Inject('FIREBASE_APP') private readonly firebaseApp: admin.app.App,
  ) {}

  async registerConsumer(payload: RegisterConsumerPayload): Promise<TokenDto> {
    const data = await admin.auth().verifyIdToken(payload.accessToken);

    const registerData: RegisterConsumerData = {
      uid: data.uid,
      name: payload.name,
      birthday: payload.birthday,
      email: data.email!,
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
    const accessToken = await this.generateAccessToken(data.uid);
    return {
      accessToken,
    };
  }

  async registerDonator(payload: RegisterDonatorPayload): Promise<TokenDto> {
    // const data = await admin.auth().verifyIdToken(payload.accessToken);
    //
    // const registerData: RegisterDonatorData = {
    //   uid: data.uid,
    //   name: payload.name,
    //   birthday: payload.birthday,
    //   email: data.email!,
    //   photo: payload.photo,
    //   country: payload.country,
    //   job: payload.job,
    //   gender: payload.gender,
    // };
    //
    // await this.authRepository.registerDonator(registerData);
    const accessToken = await this.generateAccessToken('hey');
    return {
      accessToken,
    };
  }

  async login(token: string): Promise<TokenDto> {
    const data = await admin.auth().verifyIdToken(token);

    const isExist = await this.authRepository.isUserExist(data.uid);

    if (!isExist) throw new UnauthorizedException();

    const accessToken = await this.generateAccessToken(data.uid);
    return { accessToken };
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
