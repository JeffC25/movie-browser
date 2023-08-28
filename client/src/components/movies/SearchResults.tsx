import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { MovieList } from "../../api"
import { DefaultService } from "../../api"

import MovieWidget from "./MovieWidget"
import leftIcon from "../../assets/leftbutton.svg"
import rightIcon from "../../assets/rightbutton.svg"

interface Props {
    query: string, 
    page: string,
}

const MovieResults = ({query, page}: Props) => {
    
    const currentPage = Number(page)

    const [searchResults, setSearchResults] = useState<MovieList>({page: 0,
        totalPages: 0,
        results: []});

    const [loading, setLoading] = useState<boolean>(true);

    const navigate = useNavigate();

    function prevPage() {
        setLoading(true)
        navigate(`/search?query=${query}&page=${currentPage - 1}`);
    }

    function nextPage() {
        setLoading(true)
        navigate(`/search?query=${query}&page=${currentPage + 1}`);
    }


    useEffect(() => {
        DefaultService.searchMovie(query, page )
        .then((result) => {
            setSearchResults(result)
            setLoading(false)
            // setMovies(result.results.map(MovieWidget))
        })
        .catch((error) => {
            console.error('Error: ', error)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [useLocation()])

    const movies = (searchResults.results.map(MovieWidget))
    return (
        <div>
            {loading ? <div className="w-screen h-screen bg-gray-800"></div> :
            <div className="flex justify-center">
                <div className="w-12 m-8">
                    <button onClick={prevPage} className={`fixed h-12 w-12 top-1/2 ${currentPage == 1 ? "hidden" : ""}`}>
                        <img src={leftIcon} />
                    </button>
                </div>
                <div className="static">
                    <div className="grid 2xl:grid-cols-5 lg:grid-cols-3 grid-cols-1 gap-x-2 gap-y-12 pb-12">
                        {...movies}
                    </div>
                </div>
                <div className="w-12 m-8">
                    <button onClick={nextPage} className={`fixed h-12 w-12 top-1/2 ${currentPage >= searchResults.totalPages ? "hidden" : ""}`}>
                        <img src={rightIcon} />
                    </button> 
                </div>
            </div>}
        </div>
    )
}

export default MovieResults;