import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './schemas/product.schema';
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
    async getAllProduct(
    ): Promise<Product[]> {
        return this.productService.getAllProduct()
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
