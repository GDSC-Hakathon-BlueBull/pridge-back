import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../auth/guard/role.guard';
import { User, UserType } from '@prisma/client';
import { Roles } from '../auth/decorator/role.decorator';
import { CurrentUser } from '../auth/decorator/user.decorator';
import { DonationService } from './donation.service';
import { DonationDto } from './dto/donation.dto';
import { MakeDonationPayload } from './payload/make-donation.payload';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { MatchDonationPayload } from './payload/match-donation.payload';

@Controller('donations')
@ApiTags('Donation API')
export class DonationController {
  constructor(private readonly donationService: DonationService) {}
  @Post()
  @Roles(UserType.CONSUMER)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiOperation({ description: 'make(apply) donation entity for consumer' })
  @ApiCreatedResponse({ type: DonationDto })
  async makeDonation(
    @CurrentUser() user: User,
    @Body() payload: MakeDonationPayload,
  ): Promise<DonationDto> {
    return this.donationService.makeDonation(user, payload.productId);
  }

  @Post('match')
  @Roles(UserType.DONATOR)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiOperation({ description: 'match donator to available donation' })
  @ApiCreatedResponse({ type: DonationDto })
  async matchDonation(
    @CurrentUser() user: User,
    @Body() payload: MatchDonationPayload,
  ): Promise<DonationDto> {
    return this.donationService.matchDonation(user, payload.productId);
  }
}
