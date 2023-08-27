import Carousel from "../components/carousel/Carousel";
import { DefaultService } from "../api";
import Layout from "../components/Layout";

const HomePage = () => {
    return (
        <Layout>
            <Carousel
                title="Now Playing"
                method={DefaultService.getNowPlaying}
            />
            <Carousel
                title="Trending"
                method={DefaultService.getPopular}
            />
            <Carousel
                title="Upcoming"
                method={DefaultService.getUpcoming}
            />
            <Carousel
                title="Top Rated"
                method={DefaultService.getTopRated}
            />
        </Layout>
    )
}

export default HomePage;