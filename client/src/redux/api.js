import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  reducerPath: 'adminApi',
  tagTypes: [
    'User',
    'Products',
    'Customers',
    'Transactions',
    'Geography',
    'Sales',
    'Admins',
    'Performance',
    'Dashboard'
  ],
  endpoints: build => ({
    login: build.mutation({
      query: data => ({
        url: '/auth/login',
        method: 'POST',
        body: data
      }),

      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: (response, meta, arg) => response.data,
      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (response, meta, arg) => response.data,
      invalidatesTags: ['User']
    }),

    register: build.mutation({
      query: data => ({
        url: '/auth/register',
        method: 'POST',
        body: data
      }),

      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: (response, meta, arg) => response.data,
      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (response, meta, arg) => response.data,
      invalidatesTags: ['User']
    }),

    getUser: build.query({
      query: id => `general/user/${id}`,
      providesTags: ['User']
    }),
    addProduct: build.mutation({
      query: data => ({
        url: '/client/products',
        method: 'POST',
        body: data
      }),

      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: (response, meta, arg) => response.data,
      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (response, meta, arg) => response.data,
      invalidatesTags: ['Products']
    }),
    deleteProduct: build.mutation({
      query: id => ({
        url: `/client/product/${id}`,
        method: 'DELETE'
      }),

      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: (response, meta, arg) => response.data,
      // Pick out errors and prevent nested properties in a hook or selector
      transformErrorResponse: (response, meta, arg) => response.data,
      invalidatesTags: ['Products']
    }),

    getProducts: build.query({
      query: () => 'client/products',
      providesTags: ['Products']
    }),
    getCustomers: build.query({
      query: () => 'client/customers',
      providesTags: ['Customers']
    }),
    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: 'client/transactions',
        method: 'GET',
        params: { page, pageSize, sort, search }
      }),
      providesTags: ['Transactions']
    }),
    getGeography: build.query({
      query: () => 'client/geography',
      providesTags: ['Geography']
    }),
    getSales: build.query({
      query: () => 'sales/sales',
      providesTags: ['Sales']
    }),
    getAdmins: build.query({
      query: () => 'management/admins',
      providesTags: ['Admins']
    }),
    getUserPerformance: build.query({
      query: id => `management/performance/${id}`,
      providesTags: ['Performance']
    }),
    getDashboard: build.query({
      query: () => 'general/dashboard',
      providesTags: ['Dashboard']
    })
  })
})

export const {
  useGetUserQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
  useGetUserPerformanceQuery,
  useGetDashboardQuery,
  useLoginMutation,
  useRegisterMutation
} = api
