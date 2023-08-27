import { useState } from "react";
import { useEffect } from "react";
import { CancelablePromise } from "../../api";
import { MovieList } from "../../api";
import MovieWidget from "../movies/MovieWidget";

interface Props {
    title: string
    method: (page: string) => CancelablePromise<MovieList>;
}

const Carousel = ( {title, method }: Props) => {
    
    const [movieList, setMovieList] = useState<MovieList>({
        page: 0,
        totalPages: 0,
        results: Array(8).fill({id: 0, poster: "", name: "loading", rating: 0, date: ""}),
    });

    useEffect(() => {
        method("1")
        .then((result) => {
            setMovieList(result);
        })
        .catch((error) => {
            console.error('Error: ', error);
        })
    }, );

    const movies = (movieList.results.map(MovieWidget));

    return (
        <div className="block w-4/5 mx-auto my-8">
            <div className="text-left text-white my-2">{title}</div>

            <div className="overflow-x-scroll w-full h-96 mx-auto flex space-x-2 snap-x-proximity">
                {...movies}
            </div>
        </div>
    );
};

export default Carousel;
