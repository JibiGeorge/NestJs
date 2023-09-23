import { Category } from "../schemas/product.schema";

export class UpdateProductDto {

    readonly name: string;

    readonly description: string;

    readonly category: Category;

    readonly price: number;

}