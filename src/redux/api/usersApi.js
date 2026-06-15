import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "usersApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  
    prepareHeaders: (headers) => {
      const user = JSON.parse(
        localStorage.getItem("user")
      );
  
      if (user?.token) {
        headers.set(
          "Authorization",
          `Bearer ${user.token}`
        );
      }
  
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "users",
    }),
    getPosts: builder.query({
      query: () => "posts",
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
      addPost: builder.mutation({
        query: (newPost) => ({
          url: "posts",
          method: "POST",
          body: newPost,
        }),
      }),
      
      updatePost: builder.mutation({
        query: ({ id, ...post }) => ({
          url: `posts/${id}`,
          method: "PUT",
          body: post,
        }),
      }),
      
      deletePost: builder.mutation({
        query: (id) => ({
          url: `posts/${id}`,
          method: "DELETE",
        }),
      }),
  }),
});

export const {
    useGetUsersQuery,
    useGetPostsQuery,
    useAddUserMutation,
    useDeleteUserMutation,
    useUpdateUserMutation,
    useAddPostMutation,
    useDeletePostMutation,
    useUpdatePostMutation,
  } = usersApi;