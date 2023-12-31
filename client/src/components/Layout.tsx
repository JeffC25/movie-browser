import { ReactNode } from "react";
import TopBar from "./topbar/TopBar";
import SideBar from "./sidebar/Sidebar";

interface Props {
    children: ReactNode,
}

const Layout = ({children}: Props) => {
    return (
        <div className="absolute bg-gradient-to-r from-sky-950 via-blue-950 to-indigo-950 backdrop-brightness-75 h-max min-h-screen w-full -z-50">
            <div className="overflow-auto w-full h-full absolute">
                <div className="fixed h-20 w-full z-50">
                    <SideBar />
                    <TopBar />
                </div>
                <div className="mt-20">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;