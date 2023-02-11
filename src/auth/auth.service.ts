import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { RegisterConsumerPayload } from './payload/register-consumer.payload';
import { RegisterDonatorPayload } from './payload/register-donator.payload';
import { RegisterDonatorData } from './type/register-donator.data';
import { RegisterConsumerData } from './type/register-consumer.type';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async registerConsumer(payload: RegisterConsumerPayload): Promise<void> {
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

    return this.authRepository.registerConsumer(registerData);
  }

  async registerDonator(payload: RegisterDonatorPayload): Promise<void> {
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

    return this.authRepository.registerDonator(registerData);
  }

  async login(token: string): Promise<void> {
    return;
  }
}
