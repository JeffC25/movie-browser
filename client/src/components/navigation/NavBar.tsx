// import SearchBox from "./SearchBox";
// import SearchButton from "./SearchButton";
import SearchBar from "./SearchBar";

const NavBar = () => {
    return (
        <nav className="flex bg-transparent w-full h-20 items-center">
            <div className="flex items-center justify-center align-middle h-full w-full ">
                  <SearchBar/>              
            </div>
        </nav>
      );
};

export default NavBar;