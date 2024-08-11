import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from ".";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  email: string;
  password: string;
}

interface User {
  id: number;
  email: string;
}

export interface IUser {
  _id: string;
  email: string;
  name: string;
  isOnline: boolean;
  createdAt: string;
  updatedAt: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    login: builder.mutation<User, LoginCredentials>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
      transformResponse: (response: { accessToken: string; user: User }) => {
        // Extract the JWT token and user data from the response
        const { accessToken, user } = response;
        if (accessToken) {
          localStorage.setItem("token", accessToken); // Store the token in localStorage or another storage
        }
        return user;
      },
    }),
    register: builder.mutation<User, RegisterCredentials>({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response: { user: User }) => response.user,
      invalidatesTags: ["User"],
    }),
    getUser: builder.query<User, void>({
      query: () => "/auth/me",
      providesTags: ["User"],
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useGetUserQuery } =
  authApi;
