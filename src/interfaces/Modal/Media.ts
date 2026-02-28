export interface Media {
    model_type: string,
    model_id?: number,
    collection_name?: string,
    name?: string,
    file_name?: string,
    mime_type?: string,
    size?: number,
    disk?: string,
    conversions_disk?: string,
    uuid?: string,
    created_at?: string,
    updated_at?: string,
    custom_properties?: Record<string, unknown>,
    responsive_images?: Record<string, unknown>[]
}