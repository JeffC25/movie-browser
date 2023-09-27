import { useNavigate, useLocation, createSearchParams } from "react-router-dom";
import { useState  } from "react";
import searchIcon from "../../assets/search.svg";

const SearchBar = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const navigate = useNavigate();
    
    const [search, setSearch] = useState(params.get("query") ?? "");
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (search) {
            navigate({
                pathname: "/search",
                search: createSearchParams({
                    query: search,
                    page: "1",
                }).toString()
            });
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex items-center justify-center align-middle h-full w-full ">
            <input 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text" 
                placeholder="Search" 
                className="h-12 w-1/4 rounded-l-full bg-gray-900 text-left text-gray-300 pl-6 focus:outline-none" 
            />
            <button type="submit" className="h-12 w-16 rounded-r-full bg-gray-900 ">
                <img src={searchIcon} className="w-12 h-6 hover:animate-pulse"/>
            </button>          
        </form>
    );
};

export default SearchBar;