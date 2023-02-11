import { RegisterUserPayload } from './register-user.payload';
import { Gender } from '@prisma/client';
import { IsDefined, IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDonatorPayload extends RegisterUserPayload {
  @IsDefined()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Job',
  })
  job!: string;

  @IsDefined()
  @IsEnum(Gender)
  @ApiProperty({
    enum: Gender,
    description: 'Gender',
  })
  gender!: Gender;
}
