import SearchBar from "./SearchBar";

const TopBar = () => {
    return (
        <nav className="flex bg-transparent w-full h-20 items-center">
            <div className="flex items-center justify-center align-middle h-full w-full ">
                  <SearchBar/>              
            </div>
        </nav>
      );
};

export default TopBar;