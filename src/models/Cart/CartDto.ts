import { CartItemDto } from "./CartItemDto"

export type CartDto = {
    id: string,
    items: CartItemDto[]
}