import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDetailDto } from './dto/product-detail.dto';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ProductListDto } from './dto/productlist.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get(':productId')
  @ApiOperation({ summary: 'Get product info by id' })
  @ApiOkResponse({ type: ProductDetailDto })
  async getProductById(
    @Param('productId', ParseIntPipe) productId: number,
  ): Promise<ProductDetailDto> {
    return this.productService.getProductById(productId);
  }

  @Get('/')
  @ApiOperation({ summary: 'Get List of Products' })
  @ApiOkResponse({ type: ProductListDto })
  async getProductList(): Promise<ProductListDto> {
    return this.productService.getProductList();
  }
}

