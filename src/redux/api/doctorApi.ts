import { IDoctor, IMeta } from '@/types';
import { tagTypes } from '../tag-types';
import { baseApi } from './baseApi';

const extendedApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createDoctor: build.mutation({
      query: (data) => ({
        url: '/user/create-doctor',
        method: 'POST',
        contentType: 'multipart/form-data',
        data: data,
      }),
      invalidatesTags: [tagTypes.doctor],
    }),
    getAllDoctor: build.query({
      query: (query: Record<string, any>) => ({
        url: '/doctor/',
        method: 'GET',
        params: query,
      }),
      transformResponse: (response: IDoctor[], meta: IMeta) => {
        return {
          doctors: response,
          meta,
        };
      },
      providesTags: [tagTypes.doctor],
    }),
    updateDoctor: build.mutation({
      query: (id) => ({
        url: `/doctor/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: [tagTypes.doctor],
    }),
    deleteDoctor: build.mutation({
      query: (id) => ({
        url: `/doctor/soft/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.doctor],
    }),
  }),
});

export const {
  useCreateDoctorMutation,
  useDeleteDoctorMutation,
  useGetAllDoctorQuery,
} = extendedApi;
