import Carousel from "../components/carousel/Carousel";
import { DefaultService } from "../api";
import Layout from "../components/Layout";

const HomePage = () => {
    return (
        <Layout>
            <Carousel
                title="Now Playing"
                category="now_playing"
                method={DefaultService.getCategory}
            />
            <Carousel
                title="Trending"
                category="popular"
                method={DefaultService.getCategory}
            />
            {/* <Carousel
                title="Upcoming"
                category="upcoming"
                method={DefaultService.getCategory}
            />
            <Carousel
                title="Top Rated"
                category="top_rated"
                method={DefaultService.getCategory}
            /> */}
        </Layout>
    )
}

export default HomePage;