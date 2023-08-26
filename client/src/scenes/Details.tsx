import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import type { MovieDetails } from "../api";
import { DefaultService } from "../api";

const Details = () => {
    const [details, setDetails] = useState<MovieDetails>({} as MovieDetails);

    const { id } = useParams();

    useEffect(() => {
        DefaultService.getMovieDetails(id!)
        .then((result) => {
            setDetails(result);
        })
        .catch((error) => {
            console.error('Error: ', error);
        })
    }, []);

    return (
    <div>
        <div> {details.name} </div>
    </div>
    );
};

export default Details;