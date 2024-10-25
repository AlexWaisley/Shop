import { OrderInfo } from "./OrderInfo"

export type User = {
    name: string,
    email: string,
    isEmailActive: boolean,
    password: string,
    orderInfo: OrderInfo[] | null
}