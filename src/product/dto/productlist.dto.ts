import { ApiProperty } from '@nestjs/swagger';
import { ProductSize } from '@prisma/client';

export class ProductInfoDto {
  @ApiProperty({ type: Number, description: 'Product ID' })
  id!: number;

  @ApiProperty({ type: String, description: 'Product name' })
  name!: string;

  @ApiProperty({ type: Number, description: 'Product price' })
  price!: number;

  @ApiProperty({ type: String, description: 'Product photo', nullable: true })
  photo!: string | null;

  @ApiProperty({ type: String, description: 'Product photo', nullable: true })
  size!: ProductSize;

}

export class ProductListDto {
    @ApiProperty({type: [ProductInfoDto]})
    products! : ProductInfoDto[];
}
