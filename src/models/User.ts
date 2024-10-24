import { OrderInfo } from "./OrderInfo"

export type User = {
    name: string,
    email: string,
    password: string,
    orderInfo: OrderInfo[] | null
}