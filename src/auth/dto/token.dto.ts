import { ApiProperty } from '@nestjs/swagger';

export class TokenDto {
  @ApiProperty({
    type: String,
    description: 'token for auth',
  })
  accessToken!: string;
}
