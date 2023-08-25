import { MoviePreview } from "../../api"

const MovieWidget = (movie: MoviePreview) => {
    return (
        <div className="w-52 h-full my-auto shrink-0 text-gray-400 overflow-y-clip">
            <div className="aspect-[2/3] bg-gray-400 flex relative ">
                <div className="absolute h-full w-full
                    text-white whitespace-pre-line p-2
                    opacity-0 hover:backdrop-blur-lg hover:opacity-100 hover:backdrop-brightness-50 hover:backdrop-saturate-150"
                >
                    <div className="block">Rating: {movie.rating}</div>
                    <div className="block">Released: {movie.date}</div>
                    <div className="bg-white h-px w-full my-2"></div>
                    <div className="block h-48 overflow-y-auto pr-1">{movie.overview}</div>
                    <a className="absolute bottom-2 block mt-2" href="">{"Details >>"}</a>
                </div>
                <img src= {movie.poster} alt="poster" className="object-fill shadow-md"/>
            </div>    
            <div className="block">{movie.name}</div>
        </div>
    )
}

export default MovieWidget