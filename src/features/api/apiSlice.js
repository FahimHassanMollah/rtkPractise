import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:9000",
    }),
    refetchOnReconnect: true,
    tagTypes:  ['Videos'],
    endpoints: (builder) => ({
        getVideos:builder.query({
            query:()=> '/videos',
            providesTags: ['Videos'],
            // keepUnusedDataFor:0
        }),
        getVideo:builder.query({
            query:(videoId)=> `/videos/${videoId}`,
            providesTags:(result,error,arg)=> [{type:'Video',id:arg}]
        }),
        addVideo: builder.mutation({
            query:(data) => ({
                url:'/videos',
                method:'POST',
                body:data
            }),
            invalidatesTags: ['Videos'],
        }),
        editVideo: builder.mutation({
            query:({id,data}) => ({
                url:`/videos/${id}`,
                method:'PATCH',
                body:data
            }),
            invalidatesTags: (result,error,arg)=> [{type:'Video',id:arg.id},'Videos'],
        })
    }),
});




export const {useGetVideosQuery,useGetVideoQuery,useAddVideoMutation,useEditVideoMutation} = apiSlice;
