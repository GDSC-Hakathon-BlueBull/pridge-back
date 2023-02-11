import { IsDefined, IsIn, IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { string } from 'joi';

export class AddressPayload {
  @IsDefined()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'country for address',
  })
  country!: string;

  @IsDefined()
  @IsInt()
  @ApiProperty({
    type: Number,
    description: 'postal code',
  })
  code!: number;

  @IsDefined()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'city',
  })
  city!: string;

  @IsDefined()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'street name',
  })
  street!: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    type: String,
    nullable: true,
    description: 'detail address',
  })
  detail?: string | null;

  @IsDefined()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'first name',
  })
  firstName!: string;

  @IsDefined()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'last name',
  })
  lastName!: string;
}
