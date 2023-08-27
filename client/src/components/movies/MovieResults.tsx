import { useState } from "react"
import { useEffect } from "react"
import { MovieList } from "../../api"
import { DefaultService } from "../../api"
import MovieWidget from "../../components/movies/MovieWidget"
import { useLocation } from "react-router-dom"

const MovieResults = () => {
    
    const emptyList = Array(0).fill({id: 0, poster: "", name: "loading", rating: 0, date: ""});
    const [searchResults, setSearchResults] = useState<MovieList>({page: 0,
        totalPages: 0,
        results: emptyList});

    const state = useLocation();
    console.log(state.search)
    const params = new URLSearchParams(state.search);

    useEffect(() => {
        DefaultService.searchMovie(params.get("query")!, params.get("page")!)
        .then((result) => {
            setSearchResults(result)
        })
        .catch((error) => {
            console.error('Error: ', error)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [useLocation()])

    const movies = (searchResults.results.map(MovieWidget))

    return (
        <div className="flex justify-center">
            <div className="grid grid-cols-5 gap-x-2 gap-y-12">{...movies}</div>
        </div>
        
    )
}

export default MovieResults;