import { Category } from "../schemas/product.schema";

export class CreateProductDto {

    readonly name: string;

    readonly description: string;

    readonly category: Category;

    readonly price: number;

}