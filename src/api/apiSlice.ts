import { API_METHODS } from "@/constants/api-method";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Base query setup
const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v2`,
  credentials: "same-origin",
});


// Define API slice
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: [
    "Login",
    "Users",
    "Barbers",
    "Transections",
    "Packages",
    "Reviews",
    "Services",
    "Appointments",
    "Categories",
    "Admin-Services",
  ],
  endpoints: (builder) => ({
    // Login User
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/user/login-user",
        method: API_METHODS.POST,
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Login"],
    }),

    // get Users

    allUsers: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: `/user/admin-all-users`,
        method: API_METHODS.GET,
        credentials: "include",
        params:{
          page,
          limit
        },
      }),
      providesTags: ["Users"],
    }),

    // Get Barbers

    allBarbers: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: `/barber/admin-all-barber`,
        method: API_METHODS.GET,
        credentials: "include",
        params:{
          page,
          limit
        },
      }),
      providesTags: ["Barbers"],
    }),

    // get Transection

    allTransctions: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: `/transaction/admin-all-transactions`,
        method: API_METHODS.GET,
        credentials: "include",
        params:{
          page,
          limit
        },
      }),
      providesTags: ["Transections"],
    }),

    // get all packages

    allPackages: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: `/package/all-packages-admin`,
        method: API_METHODS.GET,
        credentials: "include",
        params:{
          page,
          limit
        },
      }),
      providesTags: ["Packages"],
    }),

    //  get all reviews

    allReviews: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: `/review/admin-all-reviews`,
        method: API_METHODS.GET,
        credentials: "include",
        params:{
          page,
          limit
        },
      }),
      providesTags: ["Reviews"],
    }),

    // get all services

    allServices: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: `/service/all-services-admin`,
        method: API_METHODS.GET,
        credentials: "include",
        params: {
          page,
          limit,
        },
      }),
      providesTags: ["Services"],
    }),

    // get all appointments

    allAppointments: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: `/order/all-orders-admin`,
        method: API_METHODS.GET,
        credentials: "include",
        params:{
          page,
          limit
        },
      }),
      providesTags: ["Appointments"],
    }),

    // =============== Categories ===================//

    //  create category

    createCategory: builder.mutation({
      query: (data) => {
        return {
          url: "/layout/create-layout",
          method: API_METHODS.POST,
          body: data,
          credentials: "include",
        };
      },
      invalidatesTags: ["Categories"],
    }),

    // update category

    updateCategory: builder.mutation({
      query: ({ id, ...data }) => {
        return {
          url: `/layout/edit-layout/${id}`,
          method: API_METHODS.PUT,
          body: data?.data,
          credentials: "include",
        };
      },
      invalidatesTags: ["Categories"],
    }),

    // get all categories

    allCategories: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: `/layout/all-categories-admin`,
        method: API_METHODS.GET,
        credentials: "include",
        params:{
          page,
          limit
        },
      }),
      providesTags: ["Categories"],
    }),

    // ============= Admin-Services ============== //

    // create-admin servcies

    createAdminService: builder.mutation({
      query: ({ categoryId, formData }) => {
      
        return {
          url: `/layout/create-service/${categoryId}`, 
          method: API_METHODS.POST,
          body: formData, 
          credentials: "include",
        };
      },
      invalidatesTags: ["Admin-Services"],
    }),

    // update-admin-servcie

    updateAdminService: builder.mutation({
      query: ({ categoryId, serviceId, formData }) => {
        return {
          url: `/layout/edit-service/${categoryId}/${serviceId}`, 
          method: API_METHODS.PUT,
          body: formData, 
          credentials: "include",
        };
      },
      invalidatesTags: ["Admin-Services"],
    }),
    

    // Get All Admin Services

    allAdminServices: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: `/layout/get-all-services`,
        method: API_METHODS.GET,
        credentials: "include",
      }),
      providesTags: ["Admin-Services"],
    }),

    // delete admi service

    deleteAdminService: builder.mutation({
      query: ({ categoryId, serviceId, formData }) => {
        return {
          url: `/layout/delete-service/${categoryId}/${serviceId}`, 
          method: API_METHODS.DELETE,
          body: formData, 
          credentials: "include",
        };
      },
      invalidatesTags: ["Admin-Services"],
    }),
  }),
});

// Export hooks
export const {
  useLoginUserMutation,
  useAllUsersQuery,
  useAllBarbersQuery,
  useAllTransctionsQuery,
  useAllPackagesQuery,
  useAllReviewsQuery,
  useAllServicesQuery,
  useAllAppointmentsQuery,
  useAllCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useAllAdminServicesQuery,
  useCreateAdminServiceMutation,
  useUpdateAdminServiceMutation,
  useDeleteAdminServiceMutation,
} = apiSlice;
