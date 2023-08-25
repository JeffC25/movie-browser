import { MoviePreview } from "../../api"

const MovieWidget = (movie: MoviePreview) => {
    return (
        <div className="w-52 h-full my-auto shrink-0 text-gray-400">
            <div className="aspect-[2/3] bg-gray-400 flex relative ">
                <div className="absolute h-full w-full
                    text-white whitespace-pre-line pl-2 pt-2
                    opacity-0 hover:backdrop-blur hover:opacity-100"
                >
                    <div className="block">{movie.name}</div>
                    <div className="block">Rating: {movie.rating}</div>
                    <div className="block">Released: {movie.date}</div>
                </div>
                <img src= {movie.poster} alt="poster" className="object-fill shadow-md"/>
            </div>    
            
        </div>
    )
}

export default MovieWidget