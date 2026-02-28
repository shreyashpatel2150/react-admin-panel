import { commonFile } from "../Common";

export interface User {
    id?: number,
    name: string,
    email: string,
    password?: string,
    confirm_password?: string,
    profile: commonFile
}