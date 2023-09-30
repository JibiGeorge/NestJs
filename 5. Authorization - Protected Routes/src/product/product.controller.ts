import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('product')
export class ProductController {
    constructor(
        private productSevice: ProductService
    ) { }

    @Post()
    @UseGuards(AuthGuard())
    async createProduct(
        @Body()
        product: CreateProductDto
    ): Promise<Product> {
        return await this.productSevice.createProduct(product)
    }

    @Get()
    @UseGuards(AuthGuard())
    async getAllProduct(
    ): Promise<Product[]> {
        return this.productSevice.getAllProduct()
    }

    @Put(':id')
    @UseGuards(AuthGuard())
    async updateProduct(
        @Param('id')
        id: string,
        @Body()
        product: UpdateProductDto
    ): Promise<Product> {
        return await this.productSevice.updateProduct(id, product)
    }

    @Delete(':id')
    @UseGuards(AuthGuard())
    async deleteProduct(
        @Param("id")
        id: string
    ): Promise<Product> {
        return this.productSevice.deleteProduct(id)
    }
}
