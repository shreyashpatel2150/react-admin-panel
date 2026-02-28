import { startsWith } from "lodash-es"
import { appUrl } from "../consts"

export function apiUrl(uri: string): string {
    if (startsWith(uri, 'http')) return uri
    return `${appUrl}/api/${uri}`
}