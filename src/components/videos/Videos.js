import { useGetVideosQuery } from "../../features/api/apiSlice";
import Video from "./Video";
import VideoLoader from '../ui/loaders/VideoLoader';
import Error from "../ui/Error";

export default function Videos() {
    const { data: videos, isLoading, isError,error,isSuccess } = useGetVideosQuery();
    let content = null;

    if (isLoading) {
        content = <>
        <VideoLoader/>
        </>
    }
    if (!isLoading && isError) {
        content = <Error  error={error}/>
    }
    if (!isError && !isLoading && isSuccess && (videos?.length === 0) ) {
        content =  <Error  error={{message:'No videos found'}}/>
    }
    if (!isError && !isLoading && isSuccess && (videos?.length ) ) {
        content = videos.map((singleVideo,index)=> <Video key={index} video={singleVideo}/>)
    }

    return (
       content
    );
}
