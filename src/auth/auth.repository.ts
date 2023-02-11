import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';
import { RegisterDonatorData } from './type/register-donator.data';
import { UserType } from '@prisma/client';
import { RegisterConsumerData } from './type/register-consumer.type';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async registerConsumer(data: RegisterConsumerData): Promise<void> {
    await this.prisma.consumer.create({
      data: {
        user: {
          create: {
            id: data.uid,
            name: data.name,
            birthday: data.birthday,
            email: data.email,
            photo: data.photo,
            country: data.country,
            type: UserType.DONATOR,
          },
        },
        address: {
          create: {
            ...data.address,
          },
        },
      },
    });
  }

  async registerDonator(data: RegisterDonatorData): Promise<void> {
    await this.prisma.donator.create({
      data: {
        gender: data.gender,
        job: data.job,
        user: {
          create: {
            id: data.uid,
            name: data.name,
            birthday: data.birthday,
            email: data.email,
            photo: data.photo,
            country: data.country,
            type: UserType.DONATOR,
          },
        },
      },
    });
  }
}
