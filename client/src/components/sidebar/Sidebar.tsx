import { useState } from "react";

import menuIcon from "../../assets/menu.svg";
import homeIcon from "../../assets/home.svg";
import trendingIcon from "../../assets/trending.svg";
import nowPlayingIcon from "../../assets/nowplaying.svg";
import upcomingIcon from "../../assets/upcoming.svg";
import topRatedIcon from "../../assets/toprated.svg";
import { Link } from "react-router-dom";
interface Menu {
    title: string
    icon: string
    path: string
}

const SideBar = () => {
    const [open, setOpen] = useState<boolean>(false);
    const Menus: Menu[] = [
        { title: "Home", icon: homeIcon,path: "/home"},
        { title: "Trending", icon: trendingIcon, path: "/popular?page=1"},
        { title: "Now Playing", icon: nowPlayingIcon, path: "/now_playing?page=1"},
        { title: "Upcoming", icon: upcomingIcon, path: "/upcoming?page=1"},
        { title: "Top Rated", icon: topRatedIcon, path: "/top_rated?page=1"},
    ]

    function handleClick() {
        setOpen(!open);
    }

    return (
        <div className="flex bg-gray-900 shadow fixed top-0 h-screen px-2 pt-4">
            <div className={` ${open ? "w-40" : "w-8"} duration-100`}>
                <img onClick={handleClick} src={menuIcon} className="h-8"/>
                <ul>
                    {Menus.map((menu, index) => (
                        <Link to={menu.path} key={index}>
                            <li className="flex items-center gap-x-2 mt-2">
                                <img src={menu.icon} className="text-block block float-left shrink-0 h-8"/>
                                <div className={`${!open ? "hidden w-0" : "w-auto"} duration-100 overflow-hidden flex-1 whitespace-nowrap text-gray-400`}>
                                    {menu.title}
                                </div>
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    )

}

export default SideBar