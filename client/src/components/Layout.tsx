import { ReactNode } from "react";
import TopBar from "./topbar/TopBar";
import SideBar from "./sidebar/Sidebar";

interface Props {
    children: ReactNode,
}

const Layout = ({children}: Props) => {
    return (
        <div className="absolute bg-gray-800 h-max min-h-screen w-full overflow-auto -z-50">
            <div className="fixed h-20 w-full z-50">
                <SideBar />
                <TopBar />
            </div>
            <div className="mt-20">
                {children}
            </div>
        </div>
    );
};

export default Layout;