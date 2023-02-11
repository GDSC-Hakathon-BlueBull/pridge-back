import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get(':productId')
  @ApiOperation({ summary: 'Get product info by id' })
  @ApiOkResponse({ type: ProductDto })
  async getProductById(
    @Param('productId', ParseIntPipe) productId: number,
  ): Promise<ProductDto> {
    return this.productService.getProductById(productId);
  }
}
