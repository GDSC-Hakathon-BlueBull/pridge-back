import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { RegisterConsumerPayload } from './payload/register-consumer.payload';
import { RegisterDonatorPayload } from './payload/register-donator.payload';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async registerConsumer(payload: RegisterConsumerPayload): Promise<void> {
    return;
  }

  async registerDonator(payload: RegisterDonatorPayload): Promise<void> {
    return;
  }

  async login(token: string): Promise<void> {
    return;
  }
}
