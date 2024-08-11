import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from ".";
import { IUser } from "./auth.api";

export interface IDocument {
  _id: string;
  title: string;
  content: string;
  creatorId: IUser;
  currentEditors: IUser[];
  createdAt: string;
  updatedAt: string;
}

export const docsApi = createApi({
  reducerPath: "docsApi",
  baseQuery: baseQuery,
  tagTypes: ["Docs"],
  endpoints: (builder) => ({
    getDocs: builder.query<IDocument[], void>({
      query: () => "/docs",
      transformResponse: (response: { documents: IDocument[] }) =>
        response.documents,

      providesTags: ["Docs"],
    }),
    getDocById: builder.query<IDocument, string>({
      query: (id) => `/docs/${id}`,
      providesTags: ["Docs"],
      transformResponse: (response: { document: IDocument }) =>
        response.document,
    }),
    createDoc: builder.mutation({
      query: (doc) => ({
        url: "/docs",
        method: "POST",
        body: doc,
      }),
      invalidatesTags: ["Docs"],
    }),
    updateDocTitle: builder.mutation<IDocument, { id: string; title: string }>({
      query: ({ id, title }) => ({
        url: `/docs/${id}/title`,
        method: "PATCH",
        body: { title },
      }),
      invalidatesTags: ["Docs"],
    }),
    deleteDoc: builder.mutation({
      query: (id) => ({
        url: `/docs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Docs"],
    }),
  }),
});

export const {
  useGetDocsQuery,
  useCreateDocMutation,
  useUpdateDocTitleMutation,
  useDeleteDocMutation,
  useGetDocByIdQuery,
} = docsApi;
