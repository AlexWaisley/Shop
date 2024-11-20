import Decimal from "decimal.js"

export type ProductUpdateRequest = {
    id: string,
    name: string,
    description: string,
    price: Decimal,
    isAvailable: boolean,
    categoryId: number,
}