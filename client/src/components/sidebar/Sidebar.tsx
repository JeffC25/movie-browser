import { useState } from "react"
import { ReactNode } from "react"

interface Menu {
    title: string
    icon: ReactNode
    path: string
}

const SideBar = () => {
    const [open, setOpen] = useState<boolean>(false);
    const menus: Menu[] = [
        { title: "Home", icon: <button></button>, path: "/home"},
        { title: "Trending", icon: <button></button>, path: "/popular"},
        { title: "Now Playing", icon: <button></button>, path: "/now_playing"},
        { title: "Upcoming", icon: <button></button>, path: "/upcoming"},
        { title: "Top Rated", icon: <button></button>, path: "/top_rated"},
    ]
}

export default SideBar