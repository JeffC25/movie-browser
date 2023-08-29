import { ReactNode, useEffect, useState } from "react";
import { DefaultService, Video } from "../../api";

const videoCard = (video: Video) => {
    return (
        <div>
            <div className="block w-full bg-[rgba(32,32,32,0.25)] p-2">
                <iframe
                    className="w-full h-40"
                    allow="fullscreen"
                    src={video.link}>
                </iframe> 
            </div> 
        </div>
    )
}

const VideosList = (id: number) => {
    const [videos, setVideos] = useState<ReactNode[]>([]);

    useEffect(() => {
        DefaultService.getMovieVideos(id)
        .then((result) => {
            setVideos(result.map(videoCard));
        })
        .catch((error) => {
            console.error('Error: ', error);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return (
        <div className="overflow-y-scroll w-full h-full space-y-2">
            {videos}
        </div>
    )
}

export default VideosList