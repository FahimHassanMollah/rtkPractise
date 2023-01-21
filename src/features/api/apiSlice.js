import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:9000",
    }),
    refetchOnReconnect: true,
    endpoints: (builder) => ({
        getVideos:builder.query({
            query:()=> '/videos',
            // keepUnusedDataFor:0
        }),
        getVideo:builder.query({
            query:(videoId)=> `/videos/${videoId}`
        }),
        addVideo: builder.mutation({
            query:(data) => ({
                url:'/videos',
                method:'POST',
                body:data
            })
        })
    }),
});




export const {useGetVideosQuery,useGetVideoQuery,useAddVideoMutation} = apiSlice;
