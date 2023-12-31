import { useState } from "react";
import { Link } from "react-router-dom";
import homeIcon from "../../assets/home.svg";
import trendingIcon from "../../assets/trending.svg";
import nowPlayingIcon from "../../assets/nowplaying.svg";
import upcomingIcon from "../../assets/upcoming.svg";
import topRatedIcon from "../../assets/toprated.svg";
import infoIcon from "../../assets/info.svg";
interface Menu {
    title: string
    icon: string
    path: string
}

const SideBar = () => {
    const [open, setOpen] = useState<boolean>(false);
    const Menus: Menu[] = [
        { title: "Home", icon: homeIcon,path: "/home"},
        { title: "Trending", icon: trendingIcon, path: "/list?category=popular&page=1"},
        { title: "Now Playing", icon: nowPlayingIcon, path: "/list?category=now_playing&page=1"},
        { title: "Upcoming", icon: upcomingIcon, path: "/list?category=upcoming&page=1"},
        { title: "Top Rated", icon: topRatedIcon, path: "/list?category=top_rated&page=1"},
        { title: "About", icon: infoIcon, path: "/about"},
    ]

    return (
        <div onMouseOver={() => setOpen(true)} onMouseLeave={() => setOpen(false)} className="md:visible invisible flex bg-gray-900 bg-opacity-80 backdrop-blur-md shadow fixed top-0 h-screen">
            <div className={` ${open ? "w-40" : "w-16"} duration-75 px-4`}>
                <ul>
                    {Menus.map((menu, index) => (
                        <Link to={menu.path} key={index}>
                            <li className="flex items-center gap-x-4 my-6 hover:animate-pulse rounded-lg">
                                <img src={menu.icon} className="text-block block float-left shrink-0 h-6 w-6"/>
                                <div className={`${!open ? "hidden w-0" : "w-auto"} duration-75 overflow-hidden flex-1 whitespace-nowrap text-gray-300`}>
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