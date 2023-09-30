import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

export enum Category {
    GROCERY = 'Grocery',
    MOBILE = 'Mobile',
    FASHION = 'Fashion',
    ELECTRONICS = 'Electronics',
    HOME = 'Home',
    PERSONALCARE = 'Personal Care',
    APPLIANCES = 'Appliances',
    TOYANDBABY = 'Toy & Baby',
    FURNITURE = 'Furniture',
    SPORTS = 'Sports',
    MEDICINES = 'Medicines'
}

@Schema({
    timestamps: true
})

export class Product {

    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    category: Category;

    @Prop()
    price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product)