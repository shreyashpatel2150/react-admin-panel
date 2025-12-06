import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { FetchArgs, BaseQueryApi, FetchBaseQueryError, BaseQueryFn } from '@reduxjs/toolkit/query'
import { flatMap, uniq } from 'lodash-es'
import { showErrorAlert } from '../utils/alerts'

interface IPrepareHeaders {
    (headers: Headers): Headers
}

interface IBaseQueryOptions {
    baseUrl: string
    credentials: RequestCredentials
    prepareHeaders?: IPrepareHeaders
}

const baseQuery: ReturnType<typeof fetchBaseQuery> = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_URL as string,
    credentials: 'include' as RequestCredentials,
    prepareHeaders: (headers: Headers): Headers => {
        const token = localStorage.getItem('token')
        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers
    },
} as IBaseQueryOptions)

const baseQueryWithErrorHandler = async (args: FetchArgs, api: BaseQueryApi, extraOptions: object) => {
    const result = await baseQuery(args, api, extraOptions)
    if (result.error) {
        const errorMessage: string = handleHttpStatusCodeError(result.error)
        showErrorAlert(errorMessage)
        return Promise.reject(errorMessage)
    }

    return result
}

function handleHttpStatusCodeError(error: FetchBaseQueryError | unknown): string {
    if (!error) return 'An unknown error occurred.';

    let errorMessage = '';
    const e = error as Record<string, unknown>;
    const data = e.data as { errors?: Record<string, string[]>; message?: string } | undefined;
    const status = e.status as number | string | undefined;

    switch (status) {
        case 0:
            errorMessage = 'Network error: Please check your internet connection.';
            break;
        case 401:
            errorMessage = 'Unauthorized';
            break;
        case 422: {
            const validationMessages = data?.errors
                ? uniq(flatMap(Object.values(data.errors) as string[][], (messages) => messages))
                : [];
            errorMessage = validationMessages.join('<br>') || data?.message || (e.message as string) || 'Validation error occurred.';
            break;
        }
        case 405:
        case 500:
        default:
            errorMessage = 'Server Error!';
            break;
    }

    return errorMessage;
}

const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithErrorHandler as BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
    endpoints: () => ({}),
})

export default api