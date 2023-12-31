import { useLocation, useNavigate, createSearchParams } from "react-router-dom";
import { useEffect, useState, ReactNode } from "react";
import { DefaultService } from "../../api";
import MovieWidget from "./MovieWidget";
import leftIcon from "../../assets/leftbutton.svg";
import rightIcon from "../../assets/rightbutton.svg";
import Loading from "../Loading";

interface Props {
    query: string, 
    page: number,
}

const MovieResults = ({query, page}: Props) => {
    const currentPage = Number(page);
    const [searchResults, setSearchResults] = useState<ReactNode[]>([]);
    const [totalPages, setTotalPages] = useState<number>(0);

    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    const prevPage = () => {
        setLoading(true);
        navigate({
            pathname: "/search",
            search: createSearchParams({
                query: query,
                page: String(currentPage - 1),
            }).toString()
        });
    }

    const nextPage = () => {
        setLoading(true);
        navigate({
            pathname: "/search",
            search: createSearchParams({
                query: query,
                page: String(currentPage + 1),
            }).toString()
        });
    }

    useEffect(() => {
        DefaultService.searchMovie(query, page )
        .then((result) => {
            setSearchResults(result.results.map(MovieWidget));
            setTotalPages(result.totalPages)
            setLoading(false)
        })
        .catch((error) => {
            console.error('Error: ', error)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [useLocation()]);

    return (
        <div>
            {loading ? <div className="w-full bg-transparent flex justify-center"><Loading/></div>:
            <div className="flex justify-center">
                <div className="w-12 m-8">
                    <button onClick={prevPage} className={`fixed h-12 w-12 top-1/2 ${currentPage == 1 ? "hidden" : ""}`}>
                        <img src={leftIcon} />
                    </button>
                </div>
                <div className="static">
                    <div className="grid xl:grid-cols-5 lg:grid-cols-3 grid-cols-1 gap-x-2 gap-y-12 pb-12">
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

export default MovieResults;