import { Module } from '@nestjs/common';
import { DonationController } from './donation.controller';
import { DonationService } from './donation.service';
import { DonationRepository } from './donation.repository';

@Module({
  controllers: [DonationController],
  providers: [DonationService, DonationRepository],
})
export class DonationModule {}
