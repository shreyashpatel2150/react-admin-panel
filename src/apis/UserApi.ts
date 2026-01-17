import { NewUserInterface } from "../interfaces/NewUserInterface";
import { UserInterface } from "../interfaces/UserInterface";
import { attachToFormData } from "../utils/misc";
import api from "./Api";

const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query<UserInterface, void>({
            query: () => ({
                url: '/user',
            }),
        }),
        createUser: builder.mutation<void, NewUserInterface>({
            query: (payload) => ({
               url: '/users',
               method: 'POST',
               body: attachToFormData(payload)
            })
        })
    }),
    overrideExisting: false,
});

export const { useGetUserQuery, useLazyGetUserQuery, useCreateUserMutation } = userApi;