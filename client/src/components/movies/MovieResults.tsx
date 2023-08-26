import { MoviePreview } from "../../api";
import MovieWidget from "./MovieWidget";

interface Props {
    movieList: MoviePreview[];
}

const MovieResults = ({movieList}: Props) => {
    const movies = (movieList.map(MovieWidget));

    return (
        <div className="flex flex-row">
            {movies}
        </div>
    );
};

export default MovieResults;