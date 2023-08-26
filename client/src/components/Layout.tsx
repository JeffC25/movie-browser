import { ReactNode } from "react";
import NavBar from "./navigation/NavBar";

interface Props {
    children: ReactNode,
}

const Layout = ({children}: Props) => {
    return (
        <div className="bg-gray-800 h-max min-h-screen w-full overflow-auto">
            <div className="fixed w-full h-20 backdrop:blur-sm z-50">
                <NavBar />
            </div>
            <div className="mt-20">
                {children}
            </div>
        </div>
    )
}

export default Layout;