export type ProductCreateRequest = {
    name: string,
    categoryId: number,
    price: string,
    description: string,
    previews: string[]
}