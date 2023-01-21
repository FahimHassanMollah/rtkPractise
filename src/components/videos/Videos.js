import { useGetVideosQuery } from "../../features/api/apiSlice";
import Video from "./Video";
import VideoLoader from '../ui/loaders/VideoLoader';
import Error from "../ui/Error";
import { useEffect, useState } from "react";

export default function Videos() {
    // { refetchOnFocus: true }
    const [fetchVideos, setFetchVideos] = useState(true);
    const { data: videos, isLoading, isError, error, isSuccess, refetch } = useGetVideosQuery(undefined,{skip:fetchVideos});
    useEffect(() => {
        setFetchVideos(false);
    }, [])
    
    let content = null;

    if (isLoading) {
        content = <>
            <VideoLoader />
        </>
    }
    if (!isLoading && isError) {
        content = <Error error={error} />
    }
    if (!isError && !isLoading && isSuccess && (videos?.length === 0)) {
        content = <Error error={{ message: 'No videos found' }} />
    }
    if (!isError && !isLoading && isSuccess && (videos?.length)) {
        content = videos.map((singleVideo, index) => <Video key={index} video={singleVideo} />)
    }

    return (
        <>
            <section className="pt-6 pb-20 min-h-[calc(100vh_-_157px)]">
                <div className="grid grid-cols-12 gap-4 max-w-7xl mx-auto px-5 lg:px-0 min-h-[300px]">
                    {content}
                </div>
            </section>

            <div>
                <button onClick={() => refetch()}>Refetch</button>
            </div>
        </>


    );
}
