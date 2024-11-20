import Decimal from "decimal.js"

export type ProductDto = {
    id: string,
    name: string,
    price: Decimal
    isAvailable: boolean,
    categoryId: number,
}