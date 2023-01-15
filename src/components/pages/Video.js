import { useParams } from "react-router-dom";
import { useGetVideoQuery } from "../../features/api/apiSlice";
import Description from "../video/Description";
import Player from "../video/Player";
import RelatedVideos from "../video/related/RelatedVideos";
import PlayerLoader from '../ui/loaders/PlayerLoader';
import DescriptionLoader from '../ui/loaders/DescriptionLoader'
import Error from "../ui/Error";
export default function Video() {
    let content = null;
    const { videoId } = useParams();
    const { data: video, isLoading, isError, error, isSuccess } = useGetVideoQuery(videoId);

    console.log('====================================');
    console.log(video);
    console.log('====================================');
    if (isLoading) {
        content = <>
            <PlayerLoader />
            <DescriptionLoader />
        </>
    }
    if (!isLoading && isError) {
        content = <Error error={error} />
    }
    if (!isError && !isLoading && isError) {
        content = <Error error={{ message: 'No video found' }} />
    }
    if (!isError && !isLoading && isSuccess && (video?.id)) {
        content = (
            <>
                <Player link={video.link} title={video.title}/>
                <Description video={video}/>
            </>
        );
    }
    return (
        <section className="pt-6 pb-20 min-h-[calc(100vh_-_157px)]">
            <div className="mx-auto max-w-7xl px-2 pb-20 min-h-[400px]">
                <div className="grid grid-cols-3 gap-2 lg:gap-8">
                    <div className="col-span-full w-full space-y-8 lg:col-span-2">
                        {content}
                    </div>

                    <RelatedVideos />
                </div>
            </div>
        </section>
    );
}
