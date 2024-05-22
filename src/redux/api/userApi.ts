import { tagTypes } from '../tag-types';
import { baseApi } from './baseApi';

const extendedApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSingelUser: build.query({
      query: () => ({
        url: '/user/me',
        method: 'GET',
      }),
      providesTags: [tagTypes.user],
    }),
  }),
});

export const { useGetSingelUserQuery } = extendedApi;
