import { IsDefined, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginPayload {
  @IsDefined()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'accessToken from Provider Server',
  })
  accessToken!: string;
}
