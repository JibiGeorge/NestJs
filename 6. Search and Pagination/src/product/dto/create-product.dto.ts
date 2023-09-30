import { IsNotEmpty, IsString, IsNumber, IsEnum } from "class-validator";
import { Category } from "../schemas/product.schema";

export class CreateProductDto {

    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsNotEmpty()
    @IsEnum(Category, { message: "Please enter correct category." })
    readonly category: Category;

    @IsNotEmpty()
    @IsNumber()
    readonly price: number;
}