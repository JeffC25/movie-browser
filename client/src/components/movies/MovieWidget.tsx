import { MoviePreview } from "../../api"

const MovieWidget = (movie: MoviePreview) => {
    return (
        <div className="bg-gray-900 w-56 h-full my-auto rounded-xl shrink-0 text-gray-400 pl-2 pt-2 shadow-lg">
            <div>
                {movie.name}
            </div>
        </div>
    )
}

export default MovieWidget