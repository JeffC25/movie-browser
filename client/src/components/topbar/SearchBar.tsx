import { useNavigate } from "react-router-dom";
import { useState } from "react";
import searchIcon from "../../assets/search.svg"

const SearchBar = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (query) {
            navigate("/search?query=" + query.replace(" ", "%20") + "&page=1", { state: {query: query, page: "1"}, replace: true });
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex items-center justify-center align-middle h-full w-full ">
            <input 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="text" 
                placeholder="Search" 
                className="
                    h-12 w-1/4 rounded-l-full
                    bg-gray-900
                    text-left text-gray-400 pl-6 
                    focus:outline-none" 
            />
            <button className="h-12 w-16 rounded-r-full bg-gray-900 ">
                <img src={searchIcon} className="w-12 h-6 fill-gray-400"/>
            </button>          
        </form>
    )
};

export default SearchBar