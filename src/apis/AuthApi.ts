import { LoginResponse } from '../interfaces/LoginResponse';
import api from './Api'

type LoginRequest = { email: string; password: string }

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
    overrideExisting: false,
})

export const { useLoginMutation } = authApi