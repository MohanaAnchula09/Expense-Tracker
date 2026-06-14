import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "usersApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),

  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "users",
    }),
  
    addUser: builder.mutation({
      query: (newUser) => ({
        url: "users",
        method: "POST",
        body: newUser,
      }),
    }),
    deleteUser: builder.mutation({
        query: (id) => ({
          url: `users/${id}`,
          method: "DELETE",
        }),
      }),
      updateUser: builder.mutation({
        query: ({ id, ...user }) => ({
          url: `users/${id}`,
          method: "PUT",
          body: user,
        }),
      }),
  }),
});

export const {
    useGetUsersQuery,
    useAddUserMutation,
    useDeleteUserMutation,
    useUpdateUserMutation,
  } = usersApi;