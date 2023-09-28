import { Category } from "../schemas/product.schema";
import { IsOptional, IsString, IsNumber, IsEnum } from "class-validator";

export class UpdateProductDto {

    @IsOptional()
    @IsString()
    readonly name: string;

    @IsOptional()
    @IsString()
    readonly description: string;

    @IsOptional()
    @IsEnum(Category, { message: "Please enter correct category." })
    readonly category: Category;

    @IsOptional()
    @IsNumber()
    readonly price: number;
}