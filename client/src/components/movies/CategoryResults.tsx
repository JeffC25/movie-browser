import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, ReactNode } from "react";
import { DefaultService } from "../../api";
import MovieWidget from "./MovieWidget";
import leftIcon from "../../assets/leftbutton.svg";
import rightIcon from "../../assets/rightbutton.svg";

interface Props {
    category: string, 
    page: string,
}

const SearchResults = ({category, page}: Props) => {  
    const currentPage = Number(page);
    const [searchResults, setSearchResults] = useState<ReactNode[]>([]);
    const [totalPages, setTotalPages] = useState<number>(0);
    
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    function prevPage() {
        setLoading(true)
        navigate(`/list?category=${category}&page=${currentPage - 1}`);
    }

    function nextPage() {
        setLoading(true)
        navigate(`/list?category=${category}&page=${currentPage + 1}`);
    }

    useEffect(() => {
        DefaultService.getCategory(category, Number(page))
        .then((result) => {
            setSearchResults(result.results.map(MovieWidget));
            setTotalPages(result.totalPages)
            setLoading(false)
        })
        .catch((error) => {
            console.error('Error: ', error);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [useLocation()]);

    return (
        <div>
            {loading ? <div className="w-screen h-screen bg-gray-800"></div> : 
            <div className="flex justify-center">
                <div className="w-12 m-8">
                    <button onClick={prevPage} className={`fixed h-12 w-12 top-1/2 ${currentPage <= 1 ? "hidden" : ""}`}>
                        <img src={leftIcon} />
                    </button>
                </div>
                <div className="static">
                    <div className="text-gray-400">
                        {category=="popular" ? "Trending"
                        : category=="now_playing" ? "Now Playing"
                        : category=="upcoming" ? "Upcoming"
                        : category=="top_rated"? "Top Rated"
                        : "Results"}
                    </div>
                    <div className="mb-2 w-full bg-gray-300 h-px"></div>
                    <div className="grid 2xl:grid-cols-5 lg:grid-cols-3 grid-cols-1 gap-x-2 gap-y-12 pb-12">
                        {...searchResults}
                    </div>
                </div>
                <div className="w-12 m-8">
                    <button onClick={nextPage} className={`fixed h-12 w-12 top-1/2 ${currentPage >= totalPages ? "hidden" : ""}`}>
                        <img src={rightIcon} />
                    </button> 
                </div>
            </div>}
        </div>
    );
};

export default SearchResults;