import SearchBox from "./SearchBox";
import SearchButton from "./SearchButton";

const NavBar = () => {
    return (
        <nav className="flex bg-gray-900 w-full h-20 shadow-md items-center">
            {/* <button className="ml-10 absolute space-x-2 bg-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" className="w-10 h-10">
                    <path d="M 5 8 A 2.0002 2.0002 0 1 0 5 12 L 45 12 A 2.0002 2.0002 0 1 0 45 8 L 5 8 z M 5 23 A 2.0002 2.0002 0 1 0 5 27 L 45 27 A 2.0002 2.0002 0 1 0 45 23 L 5 23 z M 5 38 A 2.0002 2.0002 0 1 0 5 42 L 45 42 A 2.0002 2.0002 0 1 0 45 38 L 5 38 z"></path>
                </svg>
            </button> */}
            <div className="flex items-center justify-center align-middle h-full w-full">
                <SearchBox/>
                <SearchButton/>                
            </div>
        </nav>
      )
}

export default NavBar;