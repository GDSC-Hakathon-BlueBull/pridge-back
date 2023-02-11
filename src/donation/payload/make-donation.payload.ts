import { IsDefined, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MakeDonationPayload {
  @IsDefined()
  @IsInt()
  @ApiProperty({ type: Number, description: 'product Id' })
  productId!: number;
}
