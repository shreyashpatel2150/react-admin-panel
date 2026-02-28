import { User } from "../interfaces/Modal/User";
import { attachToFormData } from "../utils/misc";
import api from "./api";

const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query<User, void>({
            query: () => ({
                url: '/user',
            }),
        }),
        createUser: builder.mutation<void, User>({
            query: (payload) => ({
               url: '/users',
               method: 'POST',
               body: attachToFormData(payload)
            })
        }),
        updateUser: builder.mutation<void, { id: number, payload: User }>({
            query: ({ id, payload }) => {
               const fd = attachToFormData(payload)
               // For PUT with multipart/form-data, send as POST with method override
               fd.append('_method', 'PUT')

               return ({
                   url: `/users/${id}`,
                   method: 'POST',
                   body: fd,
               })
            }
        }),

        getUserDetails: builder.query<User, number>({
            query: (id: number) => ({
                url: `/users/${id}`,
            }),
            transformResponse: (response: { data?: User }) => response?.data || ({} as User),
        }),
    }),
    overrideExisting: false,
});

export const { useGetUserQuery, useLazyGetUserQuery, useCreateUserMutation, useGetUserDetailsQuery, useUpdateUserMutation } = userApi;