import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) { }

    @Post()
    async createProduct(
        @Body()
        product: CreateProductDto
    ): Promise<Product> {
        return this.productService.createProduct(product)
    }

    @Get()
    async getAllProducts(
    ): Promise<Product[]> {
        return this.productService.getAllProducts()
    }

    @Put(':id')
    async updateProduct(
        @Param('id')
        id: string,
        @Body()
        product: UpdateProductDto
    ): Promise<Product> {
        return this.productService.updateProduct(id, product)
    }

    @Delete(':id')
    async deleteProduct(
        @Param('id')
        id: string
    ): Promise<Product> {
        return this.productService.deleteProduct(id)
    }
}
