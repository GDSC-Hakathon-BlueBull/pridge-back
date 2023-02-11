import { ApiProperty } from '@nestjs/swagger';

export class ProductDetailDto {
  @ApiProperty({ type: Number, description: 'Product ID' })
  id!: number;

  @ApiProperty({ type: String, description: 'Product name' })
  name!: string;

  @ApiProperty({ type: Number, description: 'Product price' })
  price!: number;

  @ApiProperty({ type: String, description: 'Product description' })
  description!: string;

  @ApiProperty({ type: String, description: 'Product photo', nullable: true })
  photo!: string | null;

  @ApiProperty({ type: Number, description: 'Product quantity' })
  quantity!: number;
}
