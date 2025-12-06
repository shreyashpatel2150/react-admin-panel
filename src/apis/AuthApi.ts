import api from './Api'

type LoginRequest = { email: string; password: string }
type LoginResponse = { token?: string } & Record<string, unknown>

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