import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';
import { ProductDetailDto } from './dto/product-detail.dto';
import { ProductListDto } from './dto/productlist.dto';

//product 상세
@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}
  async getProductById(id: number): Promise<ProductDetailDto> {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return product;
  }

  async getProductList(): Promise<ProductListDto> {
    const products = await this.prisma.product.findMany({
      select:
      {
        id: true,
        name: true,
        price: true,
        photo: true,
        size: true,
      }
     });
    return {products};
  }
}


