import { axiosBaseQuery } from '@/helpars/axios/axiosBaseQuery';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { tagTypeList } from '../tag-types';

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({ baseUrl: 'http://localhost:8000/api/v1' }),
  endpoints: () => ({}),
  tagTypes: tagTypeList,
});
