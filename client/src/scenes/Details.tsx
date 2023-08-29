import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MovieDetails, DefaultService } from "../api";
import Layout from "../components/Layout";
import CastList from "../components/movies/CastList";

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
                <div className="block text-gray-300 md:w-3/5 whitespace-pre-line">
                    <div className="block text-xl font-semibold">{details.name}</div>
                    <div className="bg-gray-300 h-px my-2"></div>
                    <div className="block"><span className="font-semibold">Rating:</span> {details.rating}</div>
                    <div className="block"><span className="font-semibold">Released:</span> {details.date}</div>
                    <div className="block"><span className="font-semibold">Runtime:</span> {details.runtime} minutes</div>
                    <div className="block"><span className="font-semibold">Genres:</span> {genres}</div>
                    <div className="h-px my-2"></div>
                    <div className="block h-32">{details.overview}</div>
                    <div className="bg-red-400 w-full h-3/5 flex">
                        <div className="w-1/3 block h-full">
                            {CastList(Number(id!))}
                        </div>
                        <div className="w-1/3 block h-full">
                        </div>
                        <div className="w-1/3 block h-full">
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute w-full bg-gray-800 h-full top-0 z-0">
                <img src={details.backdrop} className="h-screen w-full top-0 z-0 pointer-events-none"/>
                {/* <div></div> */}
                
            </div>
            
        </Layout>
    );
};

export default Details;