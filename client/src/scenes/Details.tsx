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
    // const [cast, setCast] = useState<Cast>({} as Cast);
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
            <div className="absolute flex flex-wrap flex-row justify-center
                min-w-screen min-h-screen pt-24 p-24 sm:pd-0 z-10 top-0 w-full
                backdrop-blur-2xl backdrop-brightness-50 backdrop-saturate-150"
            >
                <div className="">
                    <img src={details.poster} className="object-cover md:mx-12"/>
                </div>
                <div className="block text-gray-300 md:w-3/5 whitespace-pre-line sm:p-0 sm:ml-0 ml-20">
                    <a href={details.homepage} className="block text-xl font-semibold">{details.name}</a>

                    <div className="bg-gray-300 h-px my-2"></div>

                    <div className="block"><span className="font-semibold">Rating:</span> {details.rating}</div>
                    <div className="block"><span className="font-semibold">Released:</span> {details.date}</div>
                    <div className="block"><span className="font-semibold">Runtime:</span> {details.runtime} minutes</div>
                    <div className="block"><span className="font-semibold">Genres:</span> {genres}</div>

                    <div className="h-px my-2"></div>

                    <div className="block h-32">{details.overview}</div>

                    <div className="bg-transparent w-full md:h-[27rem] h-1/2 block 2xl:flex ">
                        <div className="2xl:h-full h-1/3 2xl:w-1/3 w-full block">
                            <span className="mb-2 font-semibold w-full block">Cast</span>
                            {CastList(Number(id!))}
                        </div>
                        <div className="2xl:h-full h-1/3 2xl:w-1/3 w-full block">
                            <span className="mb-2 font-semibold w-full block">Reviews</span>
                            {ReviewList(Number(id!))}
                        </div>
                        <div className="2xl:h-full h-1/3 2xl:w-1/3 w-full block">
                            <span className="mb-2 font-semibold w-full block">Videos</span>
                            {VideosList(Number(id!))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute w-full bg-gray-800 h-full top-0 z-0">
                <img src={details.backdrop} className="h-screen w-full top-0 z-0 pointer-events-none"/>                
            </div>
            
        </Layout>
    );
};

export default Details;