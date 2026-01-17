import dayjs, { ConfigType, Dayjs } from 'dayjs'
import { v4 as uuidv4 } from 'uuid'

export interface AppFileData {
    id?: number | string
    uuid?: string
    file_name?: string
    name?: string
    size?: number
    mime_type?: string
    type?: string
    collection_name?: string
    custom_properties?: Record<string, unknown>
    source?: string
    created_at?: ConfigType
    updated_at?: ConfigType
}

export class AppFile {
    id?: number | string
    uuid: string
    filename?: string
    size: number
    mime?: string
    collection?: string
    customProperties: Record<string, unknown>
    source?: string
    createdAt: Dayjs
    updatedAt: Dayjs
    file?: File

    constructor(data: AppFileData | File = {}) {
        const isFile = typeof File !== 'undefined' && data instanceof File

        const d = (isFile ? {} : (data as AppFileData))

        this.id = isFile ? undefined : d.id
        this.uuid = (isFile ? undefined : d.uuid) || uuidv4()
        this.filename = isFile ? (data as File).name : (d.file_name || d.name)
        this.size = isFile ? (data as File).size : (d.size || 0)
        this.mime = isFile ? (data as File).type || undefined : (d.mime_type || d.type)
        this.collection = isFile ? undefined : d.collection_name
        this.customProperties = isFile ? {} : (d.custom_properties || {})

        // created_at/updated_at may be undefined — fallback to now
        this.createdAt = dayjs(isFile ? undefined : d.created_at)
        this.updatedAt = dayjs(isFile ? undefined : d.updated_at)

        // Setting to undefined means no file provided. If a File is passed, keep it.
        this.file = isFile ? (data as File) : undefined
    }

    getDownloadUrl(): string {
        const timestamp = this.updatedAt?.unix?.() ?? dayjs().unix()
        return `${import.meta.env.VITE_APP_URL}/media/${this.id || this.uuid}/download?t=${timestamp}`
    }

    getIcon(): string {
        switch (this.mime) {
            case 'application/vnd.mx-excel':
            case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                return 'excel'
            case 'application/msword':
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                return 'word'
            case 'application/vnd.ms-powerpoint':
            case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
                return 'powerpoint'
            case 'application/pdf':
                return 'pdf'
            default:
                return 'file'
        }
    }
}