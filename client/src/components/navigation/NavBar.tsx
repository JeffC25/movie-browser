import SearchBox from "./SearchBox";
import SearchButton from "./SearchButton";

const NavBar = () => {
    return (
        <nav className="flex bg-transparent w-full h-20 items-center">
            <div className="flex items-center justify-center align-middle h-full w-full">
                <SearchBox/>
                <SearchButton/>                
            </div>
        </nav>
      )
}

export default NavBar;