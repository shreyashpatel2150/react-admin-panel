import { UserInterface } from "../interfaces/UserInterface";
import api from "./Api";

const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query<UserInterface, void>({
            query: () => ({
                url: '/user',
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useGetUserQuery, useLazyGetUserQuery } = userApi;