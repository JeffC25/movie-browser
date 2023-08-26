// import { useState } from "react"
// import { useEffect } from "react"
// import type { MovieList } from "../api"
// import { DefaultService } from "../api"
// import MovieWidget from "../components/movies/MovieWidget"
import { useSearchParams } from "react-router-dom"

const Results = () => {
    console.log("test")
    // const page: number = 1
    //const [searchResults, SearchResults] = useState<MovieList>({} as MovieList)
    const [searchParams] = useSearchParams()
    
    console.log(searchParams)
    // useEffect(() => {
    //     DefaultService.searchMovie(params.query, page.toString())
    //     .then((result) => {
    //         SearchResults(result)
    //     })
    //     .catch((error) => {
    //         console.error('Error: ', error)
    //     })
    // }, [])

    // const movies = (searchResults.results.map(MovieWidget))

    return (
        <div>hi</div>
    )
}

export default Results;