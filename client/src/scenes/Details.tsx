import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import type { MovieDetails } from "../api";
import { DefaultService } from "../api";
import Layout from "../components/Layout";

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
        <Layout>
            <div> {details.name} </div>
        </Layout>
    );
};

export default Details;