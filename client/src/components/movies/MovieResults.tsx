import { useState } from "react"
import { useEffect } from "react"
import { MovieList } from "../../api"
import { DefaultService } from "../../api"
import MovieWidget from "../../components/movies/MovieWidget"
// import { useSearchParams } from "react-router-dom"
import { useLocation } from "react-router-dom"

const MovieResults = () => {
    
    const emptyList = Array(0).fill({id: 0, poster: "", name: "loading", rating: 0, date: ""});
    const [searchResults, setSearchResults] = useState<MovieList>({page: 0,
        totalPages: 0,
        results: emptyList});

    const state = useLocation();
    console.log(state.search)
    const params = new URLSearchParams(state.search);

    // const [searchParams] = useSearchParams();

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
        <div className="w-4/5 mx-auto h-full space-x-12 space-y-10 grid grid-cols-4">{...movies}</div>
    )
}

export default MovieResults;