import { BucketProduct } from "./BucketProductInfo"

export type BucketInfo = {
    products: BucketProduct[],
    totalCost: number
}