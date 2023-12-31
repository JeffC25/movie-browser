import { Link } from "react-router-dom";
import { MoviePreview } from "../../api";

const MovieWidget = (movie: MoviePreview) => {
    return (
        <div className="w-52 shrink-0 text-gray-400">
            <div className="aspect-[2/3] bg-gradient-to-b from-gray-500 to-gray-700 flex relative ">
                <div className="absolute h-full w-full
                    text-gray-100 whitespace-pre-line p-2
                    opacity-0 hover:backdrop-blur-lg hover:opacity-100 hover:backdrop-brightness-50 hover:backdrop-saturate-150
                    shadow-lg"
                >
                    <div className="block">Rating: {movie.rating}</div>
                    <div className="block">Released: {movie.date}</div>
                    <div className="bg-gray-100 h-px w-full my-2"></div>
                    <div className="block h-48 overflow-y-auto pr-1 text-sm">{movie.overview}</div>
                    <Link to={"/details/" + movie.id} className="absolute bottom-2 block mt-2" >{"Details >>"}</Link>
                </div>
                <img 
                    src= {movie.poster} 
                    onError={e => {
                        e.currentTarget.src="data:image/svg+xml,%3Csvg%20width%3D%22200%22%20height%3D%22200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3C%2Fsvg%3E"
                    }} 
                    alt="poster" 
                    className="object-fill text-transparent"/>
            </div>    
            <Link to={"/details/" + movie.id} className="block text-ellipsis overflow-hidden whitespace-nowrap">{movie.name}</Link>
        </div>
    );
};

export default MovieWidget;