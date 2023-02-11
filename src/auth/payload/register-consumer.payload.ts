import { RegisterUserPayload } from './register-user.payload';
import { AddressPayload } from './address.payload';
import { IsDefined, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterConsumerPayload extends RegisterUserPayload {
  @IsDefined()
  @ValidateNested()
  @ApiProperty({
    type: AddressPayload,
    description: 'Address Object',
  })
  address!: AddressPayload;
}
