import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MovieDetails, DefaultService } from "../api";
import Layout from "../components/Layout";
import CastList from "../components/movies/CastList";
import ReviewList from "../components/movies/ReviewList";
import VideosList from "../components/movies/VideoList";

const Details = () => {
    const [details, setDetails] = useState<MovieDetails>({} as MovieDetails);
    const [genres, setGenres] = useState<string[]>([])
    const { id } = useParams();

    useEffect(() => {
        DefaultService.getMovieDetails(Number(id))
        .then((result) => {
            setDetails(result);
            setGenres(result.genres.flatMap(e => ([e , ", "])).slice(0, -1))
        })
        .catch((error) => {
            console.error('Error: ', error);
        },)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Layout>
            <img src={details.backdrop} className="absolute h-full w-full top-0 z-0 pointer-events-none bg-gray-800"/>
            <div className="absolute py-20 px-20 w-full h-full top-0
                grid grid-cols-6 grid-rows-2 grid-flow-col
                text-gray-300 
                backdrop-blur-xl backdrop-brightness-50 backdrop-saturate-150"
            >
                <div className="col-span-2 row-span-2 content-cover">
                    <img src={details.poster} className="h-full my-auto float-right mr-10"/>
                </div>

                <div className="col-span-4 row-span-1 grid grid-rows-2 h-full grid-flow-col overflow-auto">
                    <div className="row-span-1">
                        <a href={details.homepage} className="block text-xl font-semibold">{details.name}</a>

                        <div className="bg-gray-300 h-px mb-2"></div>

                        <div className="block"><span className="font-semibold">Rating:</span> {details.rating}</div>
                        <div className="block"><span className="font-semibold">Released:</span> {details.date}</div>
                        <div className="block"><span className="font-semibold">Runtime:</span> {details.runtime} minutes</div>
                        <div className="block"><span className="font-semibold">Genres:</span> {genres}</div>

                        <div className="h-px my-2"></div>

                        <div className="">{details.overview}</div>
                    </div>
                </div>

                <div className="col-start-3 col-span-4 row-start-2 row-span-1 grid grid-cols-3 grid-rows-1 space-x-2">
                    <div className="col-span-1 row-span-1 mb-6">
                        <div className="font-semibold w-full">Cast</div>
                        {CastList(Number(id!))}
                    </div>
                    <div className="col-span-1 row-span-1 mb-6">
                        <div className="font-semibold w-full  snap-star">Reviews</div>
                        {ReviewList(Number(id!))}
                    </div>
                    <div className="col-span-1 row-span-1 mb-6">
                        <div className="sticky font-semibold w-full">Videos</div>
                        {VideosList(Number(id!))}
                    </div>
                </div>
            </div>            
        </Layout>
    );
};

export default Details;