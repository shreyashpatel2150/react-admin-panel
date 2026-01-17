import { AppFile } from "../classses/AppFile";
import { AppImage } from "../classses/AppImage";

export interface NewUserInterface {
    name: string,
    email: string,
    password: string,
    confirm_password: string,
    profile: undefined | Blob | File | AppFile | AppImage
}