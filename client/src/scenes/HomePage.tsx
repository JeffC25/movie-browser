import { useEffect, useState } from "react";
import Carousel from "../components/carousel/Carousel";
import type { MovieList } from "../api";
import { DefaultService } from "../api";
import Layout from "../components/Layout";

// for initial load
const emptyList = Array(1).fill({id: 0, poster: "", name: "loading", rating: 0, date: ""});

const HomePage = () => {
    const [nowPlaying, setNowPlaying] = useState<MovieList>({
        page: 0,
        totalPages: 0,
        results: emptyList
    });

    const [popular, setPopular] = useState<MovieList>({
        page: 0,
        totalPages: 0,
        results: emptyList,
    });

    const [topRated, setTopRated] = useState<MovieList>({
        page: 0,
        totalPages: 0,
        results: emptyList
    });

    const [upcoming, setUpcoming] = useState<MovieList>({
        page: 0,
        totalPages: 0,
        results: emptyList,
    });

    useEffect(() => {
        DefaultService.getNowPlaying("1")
        .then((result) => {
            setNowPlaying(result);
        })
        .catch((error) => {
            console.error('Error: ', error);
        })
    }, []);
    
    useEffect(() => {
        DefaultService.getPopular("1")
        .then((result) => {
            setPopular(result);
        })
        .catch((error) => {
            console.error('Error: ', error);
        })
    }, []);
    
    useEffect(() => {
        DefaultService.getTopRated("1")
        .then((result) => {
            setTopRated(result);
        })
        .catch((error) => {
            console.error('Error: ', error);
        })
    }, []);

    useEffect(() => {
        DefaultService.getUpcoming("1")
        .then((result) => {
            setUpcoming(result);
        })
        .catch((error) => {
            console.error('Error: ', error);
        })
    }, []);

    return (
        <Layout>
            <Carousel
                title = "Now Playing"
                movieList = {nowPlaying.results}
            />
            <Carousel 
                title = "Trending"
                movieList = {popular.results}
            />
            <Carousel 
                title = "Upcoming"
                movieList = {upcoming.results}
            />
            <Carousel
                title = "Top Rated"
                movieList = {topRated.results}
            />
        </Layout>
    )
}

export default HomePage;