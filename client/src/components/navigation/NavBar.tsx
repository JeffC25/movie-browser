import SearchBox from "./SearchBox";
import SearchButton from "./SearchButton";

const NavBar = () => {
    return (
        <nav className="relative bg-gray-900 w-full h-20 shadow-md flex justify-center items-center">
            <SearchBox/>
            <SearchButton/>
        </nav>
      )
}

export default NavBar;