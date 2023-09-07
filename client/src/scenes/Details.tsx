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
            <div className="absolute py-20 px-20 w-full h-full
                grid grid-cols-5 grid-rows-2 grid-flow-col
                text-gray-300
                backdrop-blur-xl backdrop-brightness-50 backdrop-saturate-150"
            >
                <div className="col-span-2 row-span-2 content-fill">
                    <img src={details.poster} className="h-full my-auto mx-auto"/>
                </div>

                <div className="col-span-3 row-span-1 grid grid-rows-2 ">
                    <div className="row-span-1">
                        <a href={details.homepage} className="text-xl font-semibold">{details.name}</a>
                    
                        <div className="bg-gray-300 h-px my-2"></div>

                        <div className=""><div className="font-semibold inline">Rating:</div> {details.rating}</div>
                        <div className=""><div className="font-semibold inline">Released:</div> {details.date}</div>
                        <div className=""><div className="font-semibold inline">Runtime:</div> {details.runtime} minutes</div>
                        <div className=""><div className="font-semibold inline">Genres:</div> {genres}</div>
                    </div>

                    <div className="row-span-1 overflow-auto my-2">
                        <div className="overflow-auto">{details.overview}</div>
                    </div>

                </div>

                <div className="col-start-3 col-span-3 row-start-2 row-span-1 grid grid-cols-3 grid-rows-1 space-x-2">
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
            <div className="static w-full bg-gray-800 h-screen top-0 z-0 -mt-20">
                <img src={details.backdrop} className="h-full w-full top-0 z-0 pointer-events-none"/>                
            </div>
            
        </Layout>
    );
};

export default Details;