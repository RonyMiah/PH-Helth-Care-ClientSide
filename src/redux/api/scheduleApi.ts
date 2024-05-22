import { IMeta } from '@/types';
import { tagTypes } from '../tag-types';
import { baseApi } from './baseApi';

const extendedApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createSchedule: build.mutation({
      query: (data) => ({
        url: '/schedule',
        method: 'POST',
        data,
      }),
      invalidatesTags: [tagTypes.schedule],
    }),

    getAllSchedules: build.query({
      query: (query: Record<string, any>) => ({
        url: '/schedule',
        method: 'GET',
        params: query,
      }),
      // transformResponse: (response: [], meta: IMeta) => {
      //   return {
      //     schedules: response,
      //     meta,
      //   };
      // },
      providesTags: [tagTypes.schedule],
    }),

    deleteSchedule: build.mutation({
      query: (id) => ({
        url: `/schedule/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.schedule],
    }),
  }),
});

export const {
  useCreateScheduleMutation,
  useGetAllSchedulesQuery,
  useDeleteScheduleMutation,
} = extendedApi;
