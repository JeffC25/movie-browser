import { useState, useEffect, ReactNode } from "react";
import { DefaultService } from "../../api";
import MovieWidget from "../movies/MovieWidget";

interface Props {
    title: string
    category: string
};

const Carousel = ( {title, category }: Props) => {
    const [movieList, setMovieList] = useState<ReactNode[]>([]);

    useEffect(() => {
        DefaultService.getCategory(category, 1)
        .then((result) => {
            setMovieList(result.results.map(MovieWidget));
        })
        .catch((error) => {
            console.error('Error: ', error);
        }) 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="block w-4/5 mx-auto ">
            <div className="text-left text-gray-300 my-2">{title}</div>
            <div className="overflow-x-scroll w-full h-96 mx-auto flex space-x-2">
                {...movieList}
            </div>
        </div>
    );
};

export default Carousel;
