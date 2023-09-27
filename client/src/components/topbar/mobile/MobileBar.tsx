import SearchBar from "../SearchBar";
// import homeIcon from "../../../assets/home.svg";
// import trendingIcon from "../../../assets/trending.svg";
// import nowPlayingIcon from "../../../assets/nowplaying.svg";
// import upcomingIcon from "../../../assets/upcoming.svg";
// import topRatedIcon from "../../../assets/toprated.svg";
// import infoIcon from "../../../assets/info.svg";
import menuIcon from "../../../assets/menu.svg";
import { useState } from "react";

const MobileBar = () => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    }

    return (
        <nav className="flex flex-column bg-transparent w-full h-20 items-center">
            <button type="button" className={`${open && 'rotate-180'} duration-75`}>
                <img onClick={handleClick} src={menuIcon} className="h-6 w-6"/>
            </button>

            <div className="flex items-center justify-center align-middle h-full w-full ">
                  <SearchBar/>              
            </div>

            <div className="flex flex-grow">
                
            </div>
        </nav>
      );
};

export default MobileBar;