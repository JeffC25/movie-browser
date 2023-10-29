import SearchBar from "./SearchBar";

const TopBar = () => {
    return (
        <nav className="flex bg-transparent w-full h-20 items-center justify-center">
            <div className="flex items-center align-middle h-full w-3/4 md:w-1/4 ">
                  <SearchBar/>              
            </div>
        </nav>
      );
};

export default TopBar;