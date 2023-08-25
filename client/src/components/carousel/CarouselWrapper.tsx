import { ReactNode } from "react"

interface Props {
    children: ReactNode,
}

const CarouselWrapper = ({children}: Props) => {
    return (
        <div className="block w-full ">
            {children}
        </div>
    )
}

export default CarouselWrapper