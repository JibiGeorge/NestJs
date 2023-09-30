import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Product } from './schemas/product.schema';
import mongoose from 'mongoose';
import { Query } from 'express-serve-static-core'


@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name)
        private productModel: mongoose.Model<Product>
    ) { }

    async createProduct(product: Product): Promise<Product> {
        const res = await this.productModel.create(product)
        return res
    }

    async getAllProduct(query: Query): Promise<Product[]> {
        const resPerPage = Number(query.size) || 2;
        const currentPage = Number(query.page) || 1;
        const skip = resPerPage * (currentPage - 1)
        const keyword = query.keyword ? {
            name: {
                $regex: query.keyword,
                $options: 'i'
            }
        } : {}
        const res = await this.productModel.find({ ...keyword }).limit(resPerPage).skip(skip)
        return res
    }

    async updateProduct(id: string, product: Product): Promise<Product> {
        const isFound = await this.productModel.findById(id)
        if (!isFound) {
            throw new NotFoundException("Product not found!")
        }
        const res = await this.productModel.findByIdAndUpdate(id, product, {
            new: true,
            runValidators: true
        })
        return res
    }

    async deleteProduct(id: string): Promise<Product> {
        const isValidId = mongoose.isValidObjectId(id)
        if (!isValidId) {
            throw new NotFoundException("Please enter correct Id")
        }

        return await this.productModel.findByIdAndDelete(id)
    }
}
