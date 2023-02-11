import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';
import { Donation, DonationState } from '@prisma/client';

@Injectable()
export class DonationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async isProductExist(productId: number): Promise<boolean> {
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    return !!product;
  }

  async createDonation(userId: string, productId: number): Promise<Donation> {
    return this.prisma.donation.create({
      data: {
        productId,
        consumerId: userId,
      },
    });
  }

  async getMatchableDonation(productId: number): Promise<Donation[]> {
    return this.prisma.donation.findMany({
      where: {
        productId,
        state: DonationState.PENDING,
      },
    });
  }

  async matchDonation(userId: string, donationId: number): Promise<Donation> {
    return this.prisma.donation.update({
      where: {
        id: donationId,
      },
      data: {
        state: DonationState.MATCHED,
        donatorId: userId,
        matchedTime: new Date(),
      },
    });
  }
}
