import { BucketInfo } from "./Bucket"

export type OrderInfo = {
    id: number,
    bucket: BucketInfo,
    addressInfo: string,
    status: string,
}