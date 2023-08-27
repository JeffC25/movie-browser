import { useState } from "react"
import { useEffect } from "react"
import type { MovieList } from "../api"
import { DefaultService } from "../api"
import MovieWidget from "../components/movies/MovieWidget"
// import { MoviePreview } from "../api"
import { useSearchParams } from "react-router-dom"

const Results = () => {
    
    const emptyList = Array(0).fill({id: 0, poster: "", name: "loading", rating: 0, date: ""});

    const [searchResults, setSearchResults] = useState<MovieList>({page: 0,
        totalPages: 0,
        results: emptyList});

    const [searchParams] = useSearchParams();
    
    const queryPage = searchParams.get("page");
    let page = "1";
    if (queryPage && !isNaN(Number(queryPage))) {
        page = queryPage;
    }
    
    console.log(searchParams)

    useEffect(() => {
        DefaultService.searchMovie(searchParams.get("query")!, page)
        .then((result) => {
            setSearchResults(result)
        })
        .catch((error) => {
            console.error('Error: ', error)
        })
    }, [])

    const movies = (searchResults.results.map(MovieWidget))

    return (
        <div>{...movies}</div>
    )
}

export default Results;