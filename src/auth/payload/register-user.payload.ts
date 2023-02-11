import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDate,
  IsDefined,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserType } from '@prisma/client';

export class RegisterUserPayload {
  @IsDefined()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'accessToken from Provider Server',
  })
  accessToken!: string;

  @IsDefined()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'nickname',
  })
  name!: string;

  @IsDefined()
  @IsDate()
  @ApiProperty({
    type: Date,
    description: 'birthday',
  })
  birthday!: Date;

  @IsDefined()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'email',
  })
  email!: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    type: String,
    description: 'photo',
    nullable: true,
  })
  photo?: string | null;

  @IsDefined()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'country',
  })
  country!: string;
}
