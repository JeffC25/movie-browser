import { useEffect, useState } from "react";
import Carousel from "../components/carousel/Carousel";
import CarouselWrapper from "../components/carousel/CarouselWrapper";
// import Divider from "../components/Divider";
import type { MovieList } from "../api";
import { DefaultService } from "../api";

// for initial load
const emptyList = Array(1).fill({id: 0, poster: "", name: "loading", rating: 0, date: ""})

const HomePage = () => {
    const [nowPlaying, setNowPlaying] = useState<MovieList>({
        page: 0,
        totalPages: 0,
        results: emptyList
    })

    const [popular, setPopular] = useState<MovieList>({
        page: 0,
        totalPages: 0,
        results: emptyList
    })

    useEffect(() => {
        DefaultService.getNowPlaying("1")
        .then((result) => {
            setNowPlaying(result)
        })
        .catch((error) => {
            console.error('Error: ', error)
        })
    }, [])
    
    useEffect(() => {
        DefaultService.getPopular("1")
        .then((result) => {
            setPopular(result)
        })
        .catch((error) => {
            console.error('Error: ', error)
        })
    }, [])
    

    return (
        <CarouselWrapper>
            <Carousel
                title = "Now Playing"
                movieList = {nowPlaying.results}
            />
            {/* <Divider/> */}
            <Carousel 
                title = "Popular"
                movieList = {popular.results}
            />
        </CarouselWrapper>
    )
}

export default HomePage;