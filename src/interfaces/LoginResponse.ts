import { UserInterface } from "./UserInterface";

export interface LoginResponse {
    token: string;
    user: UserInterface
}