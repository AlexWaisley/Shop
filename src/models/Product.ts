import Decimal from "decimal.js"

export type Product = {
    id: string,
    name: string,
    description: string,
    price: Decimal,
    isAvailable: boolean,
    categoryId: number
}