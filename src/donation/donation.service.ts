import { Injectable, NotFoundException } from '@nestjs/common';
import { DonationRepository } from './donation.repository';
import { User } from '@prisma/client';
import { DonationDto } from './dto/donation.dto';

@Injectable()
export class DonationService {
  constructor(private readonly donationRepository: DonationRepository) {}

  async makeDonation(user: User, productId: number): Promise<DonationDto> {
    const isExistProduct = await this.donationRepository.isProductExist(
      productId,
    );

    if (!isExistProduct) throw new NotFoundException('Product ID is not exist');

    const donation = await this.donationRepository.createDonation(
      user.id,
      productId,
    );

    return {
      id: donation.id,
      donatorId: donation.donatorId,
      consumerId: donation.consumerId,
      productId: donation.productId,
      matchedTime: donation.matchedTime,
    };
  }
}
