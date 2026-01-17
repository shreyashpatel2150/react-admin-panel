import { isFunction, isObjectLike } from 'lodash-es'
import { AppFile, AppFileData } from '../classses/AppFile'
import { AppImage } from '../classses/AppImage'
import dayjs from 'dayjs'

export function fileToTemplate(jsFile?: File | AppFileData): Promise<AppFile> {
    if (!jsFile) {
        return Promise.resolve(new AppFile())
    }

    const maybeType = (jsFile as File).type
    if (typeof maybeType === 'string' && maybeType.match('image.*')) {
        const appImage = new AppImage(jsFile as File)
        return appImage.loadFile(jsFile as File)
    }

    return Promise.resolve(new AppFile(jsFile as AppFileData))
}

interface MediaObject {
    id: unknown
    disk: string
}

export function attachToFormData(
    valueToAttach: unknown,
    formDataKey: string | null = null,
    formData: FormData | null = null
): FormData {
    if (!formData) formData = new FormData()
    const isMediaObject = isObjectLike(valueToAttach) && (valueToAttach as MediaObject).id && (valueToAttach as MediaObject).disk === 'media'

    if (valueToAttach === undefined) {
        return formData
    } else if (!isObjectLike(valueToAttach)) {
        formData.append(formDataKey || '', String(valueToAttach))
    } else if (valueToAttach instanceof dayjs) {
        formData.append(formDataKey || '', (valueToAttach as dayjs.Dayjs).toISOString())
    } else if (valueToAttach instanceof AppFile || valueToAttach instanceof AppImage || isMediaObject) {
        if ((valueToAttach as AppFile).file) {
            const file = (valueToAttach as AppFile).file
            if (file) {
                formData.append(`${formDataKey}[file]`, file)
            }
            attachToFormData((valueToAttach as AppFile).customProperties, `${formDataKey}[custom_properties]`, formData)
        }
    } else if (valueToAttach instanceof File || valueToAttach instanceof Blob) {
        formData.append(formDataKey || '', valueToAttach)
    } else {
        if (isFunction((valueToAttach as Record<string, unknown>).get)) {
            valueToAttach = (valueToAttach as { get: () => unknown }).get()
        }

        for (const key in valueToAttach as Record<string, unknown>) {
            const subKey: string = formDataKey ? `${formDataKey}[${key}]` : key
            attachToFormData((valueToAttach as Record<string, unknown>)[key], subKey, formData)
        }
    }

    return formData
}