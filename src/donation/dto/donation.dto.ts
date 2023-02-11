import { ApiProperty } from '@nestjs/swagger';

export class DonationDto {
  @ApiProperty({ type: Number, description: 'donation ID' })
  id!: number;

  @ApiProperty({ type: String, description: 'consumer ID' })
  consumerId!: string;

  @ApiProperty({ type: String, description: 'donator ID', nullable: true })
  donatorId!: string | null;

  @ApiProperty({ type: Number, description: 'product ID' })
  productId!: number;

  @ApiProperty({ type: Date, description: 'matched time' })
  matchedTime!: Date | null;
}
