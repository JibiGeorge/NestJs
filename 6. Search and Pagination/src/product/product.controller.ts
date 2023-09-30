import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '@nestjs/passport';
import { Query as ExpressQuery } from 'express-serve-static-core'

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
        @Query() query: ExpressQuery
    ): Promise<Product[]> {
        return this.productSevice.getAllProduct(query)
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
