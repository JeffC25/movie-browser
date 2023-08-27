import { ReactNode } from "react";
import TopBar from "./topbar/TopBar";
import SideBar from "./sidebar/Sidebar";

interface Props {
    children: ReactNode,
}

const Layout = ({children}: Props) => {
    return (
        <div className="bg-gray-800 h-max min-h-screen w-full overflow-auto">
            <div className="fixed h-20 w-full z-50">
                <SideBar />
                <TopBar />
                {/* <div className="absolute inset-x-0 top-4 w-[calc(33%)] h-12 rounded-full mx-auto bg-red-500 z-40"></div> */}
            </div>
            <div className="mt-20">
                {children}
            </div>
        </div>
    )
}

export default Layout;