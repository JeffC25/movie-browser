import { type ReactNode } from "react";

interface Props {
    title: string
    slides: ReactNode[];
}

const Carousel = ( {title, slides }: Props) => {
    
    return (
        <div className="block w-4/5 mx-auto my-10">
            <div className="text-left text-white mb-1">{title}</div>
            <div className="overflow-x-scroll w-full h-72 bg-gray-50 rounded-lg mx-auto border-2 flex ">
                {...slides}
            </div>
        </div>
    )
}

export default Carousel;
