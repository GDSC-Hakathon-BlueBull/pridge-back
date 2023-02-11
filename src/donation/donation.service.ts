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

  async matchDonation(user: User, productId: number): Promise<DonationDto> {
    const isExistProduct = await this.donationRepository.isProductExist(
      productId,
    );

    if (!isExistProduct) throw new NotFoundException('Product ID is not exist');

    const matchableDonationList =
      await this.donationRepository.getMatchableDonation(productId);

    if (matchableDonationList.length === 0) {
      throw new NotFoundException(
        'there is no available donation with that productId',
      );
    }

    const randomIndex = Math.floor(
      Math.random() * matchableDonationList.length,
    );

    const donation = await this.donationRepository.matchDonation(
      user.id,
      matchableDonationList[randomIndex].id,
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
