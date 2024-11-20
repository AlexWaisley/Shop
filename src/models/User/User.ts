import { EmailInfo } from "./EmailInfo"

export type User = {
    id: string,
    name: string,
    isAdmin: boolean,
    email: EmailInfo
}