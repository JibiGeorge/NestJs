import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import * as mongoose from 'mongoose'

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
    
    async getAllProducts(): Promise<Product[]>{
        const res = await this.productModel.find()
        return res
    }

    async updateProduct(id: string, product: Product): Promise<Product>{
        const isFound = await this.productModel.findById(id)
        if(!isFound){
            throw new NotFoundException("Product not found!")
        }
        const res = await this.productModel.findByIdAndUpdate(id, product,{
            new: true,
            runValidators: true
        })
        return res
    }

    async deleteProduct(id: string): Promise<Product>{
        const isValidId = mongoose.isValidObjectId(id)
        if(!isValidId){
            throw new NotFoundException("Please Enter correct Id")
        }

        return await this.productModel.findByIdAndDelete(id)
    }
}
