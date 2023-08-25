import { ReactNode } from "react";
import Carousel from "../components/carousel/Carousel";
import CarouselWrapper from "../components/carousel/CarouselWrapper";
import Divider from "../components/Divider";
import MoviePreview from "../components/movies/MoviePreview";

const HomePage = () => {
    const slides: ReactNode[] = [(<MoviePreview />), (<MoviePreview />), (<MoviePreview />), (<MoviePreview />), (<MoviePreview />), (<MoviePreview />), (<MoviePreview />), (<MoviePreview />), (<MoviePreview />), (<MoviePreview />),]
    return (
        <CarouselWrapper>
            <Carousel 
                title = "Now Playing"
                slides = {slides}
            />
            <Divider/>
            <Carousel 
                title = "Popular"
                slides = {slides}
            />
        </CarouselWrapper>
    )
}

export default HomePage;