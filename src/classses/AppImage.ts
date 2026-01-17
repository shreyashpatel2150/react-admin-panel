import { AppFile, AppFileData } from './AppFile'
import { get } from 'lodash-es'

export class AppImage extends AppFile {
    width: number
    height: number
    isImage: boolean
    rotationClass: string
    source?: string

    constructor(data: AppFileData | File = {}) {
        super(data)

        const isFile = typeof File !== 'undefined' && data instanceof File

        // data may be a File or an object — when File, fallback values
        const d = (isFile ? {} : (data as AppFileData))

        this.filename = (d.file_name || this.filename) || 'photo-placeholder.png'
        this.width = get(d.custom_properties, 'width', 0) as number
        this.height = get(d.custom_properties, 'height', 0) as number
        this.isImage = true
        this.rotationClass = ''

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.source = (d as any).source // base64 only; keep as-is if provided
    }

    // Load some information from js file object
    loadFile(file?: File): Promise<this> {
        return new Promise((resolve) => {
            if (!file || !file.type.match('image.*')) {
                return resolve(this)
            }

            this.file = file
            this.filename = file.name
            this.size = file.size

            const render = new FileReader()
            render.onload = (evt: ProgressEvent<FileReader>) => {
                const result = evt.target?.result as string | null
                const img = new Image()
                img.onload = async () => {
                    this.width = img.width
                    this.height = img.height

                                const orientation = await this.getOrientation(file)
                                switch (orientation) {
                                    case 6:
                                        this.rotationClass = 'transform: rotate(90deg)'
                                        break
                                    case 8:
                                        this.rotationClass = 'transform: rotate(270deg)'
                                        break
                                    case 3:
                                        this.rotationClass = 'transform: rotate(180deg)'
                                        break
                                }
                    return resolve(this)
                }
                img.src = (this.source = result as string)
            }

            render.readAsDataURL(file)
        })
    }

    getSrc(size?: string): string {
        const timestamp = this.updatedAt.unix()
        return (
            this.source || `${import.meta.env.VITE_APP_URL}/media/${this.id || this.uuid || 0}/image?t=${timestamp}${size ? `&size=${size}` : ''}`
        )
    }

    getThumbnail(): string {
        return this.getSrc('web')
    }

    getOrientation(file: File): Promise<number> {
        return new Promise((resolve) => {
            const render = new FileReader()
            render.onload = (evt: ProgressEvent<FileReader>) => {
                const buffer = evt.target?.result as ArrayBuffer | null
                if (!buffer) return resolve(-1)
                const view = new DataView(buffer)
                if (view.getUint16(0, false) !== 0xffd8) {
                    return resolve(-2)
                }
                const length = view.byteLength
                let offset = 2
                while (offset < length) {
                    if (view.getUint16(offset + 2, false) <= 8) return resolve(-1)
                    const marker = view.getUint16(offset, false)
                    offset += 2
                    if (marker === 0xffe1) {
                        if (view.getUint32((offset += 2), false) !== 0x45786966) {
                            return resolve(-1)
                        }

                        const little = view.getUint16((offset += 6), false) === 0x4949
                        offset += view.getUint32(offset + 4, little)
                        const tags = view.getUint16(offset, little)
                        offset += 2
                        for (let i = 0; i < tags; i++) {
                            if (view.getUint16(offset + i * 12, little) === 0x0112) {
                                return resolve(view.getUint16(offset + i * 12 + 8, little))
                            }
                        }
                    } else if ((marker & 0xff00) !== 0xff00) {
                        break
                    } else {
                        offset += view.getUint16(offset, false)
                    }
                }
                return resolve(-1)
            }
            render.readAsArrayBuffer(file)
        })
    }
}