import Decimal from "decimal.js"

export type ProductCreateRequest = {
    name: string,
    categoryId: number,
    price: Decimal,
    description: string,
    previews: string[]
}