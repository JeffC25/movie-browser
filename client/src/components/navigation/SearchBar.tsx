import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SearchBar = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (query) {
            navigate("/results?query=" + query + "&page=1", { state: {query: query, page: "1"}, replace: true });
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
            <button  className="h-12 w-16 rounded-r-full bg-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="-8 -2 50 50" className="w-12 h-6 fill-gray-400">
                    <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
                </svg>
            </button>          
        </form>
    )
};

export default SearchBar