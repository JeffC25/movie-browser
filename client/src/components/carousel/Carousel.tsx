// import { type ReactNode } from "react";
import { MoviePreview } from "../../api";
import MovieWidget from "../movies/MovieWidget";
interface Props {
    title: string
    movieList: MoviePreview[];
}

const Carousel = ( {title, movieList }: Props) => {
    
    const movies = (movieList.map(MovieWidget))

    return (
        <div className="block w-4/5 mx-auto my-10">
            <div className="text-left text-white mb-1">{title}</div>
            <div className="overflow-x-scroll w-full h-72 mx-auto flex space-x-2">
                {...movies}
            </div>
        </div>
    )
}

export default Carousel;
