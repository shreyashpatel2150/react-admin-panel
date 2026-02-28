import { DatatableResponse } from "../interfaces/DatatableResponse";
import api from "./api";

const datatableApi = api.injectEndpoints({
    endpoints: (builder) => ({
        listing: builder.query<DatatableResponse, { url: string, params: string }>({
            query: ({ url, params }) => ({
                url: url,
                params: new URLSearchParams(params),
                method: 'GET'
            }),
        }),
    }),
    overrideExisting: false,
})

export const { useListingQuery } = datatableApi;