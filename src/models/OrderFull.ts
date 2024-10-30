import { OrderItemDto } from "./OrderItemDto"

export type OrderFull = {
    id: string,
    userId: string,
    status: string,
    shippingAddress: number,
    items: OrderItemDto[]
} 