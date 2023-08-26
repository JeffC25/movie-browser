// import { type ReactNode } from "react";
import { MoviePreview } from "../../api";
import MovieWidget from "../movies/MovieWidget";
interface Props {
    title: string
    movieList: MoviePreview[];
}

const Carousel = ( {title, movieList }: Props) => {
    
    const movies = (movieList.map(MovieWidget));

    return (
        <div className="block w-4/5 mx-auto">
            <div className="text-left text-white my-2">{title}</div>

            <div className="overflow-x-scroll w-full h-96 mx-auto flex space-x-2 snap-x-proximity">
                {...movies}
            </div>
        </div>
    );
};

export default Carousel;
