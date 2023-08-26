import { ReactNode } from "react";
import NavBar from "./navigation/NavBar";

interface Props {
    children: ReactNode,
}

const Layout = ({children}: Props) => {
    return (
        <div className="bg-gray-800 min-h-screen w-screen">
            <NavBar />
            {children}
        </div>
    );
};

export default Layout;