import Carousel from "../components/carousel/Carousel";
import Layout from "../components/Layout";

const HomePage = () => {
    return (
        <Layout>
            <Carousel
                title="Now Playing"
                category="now_playing"
            />
            <Carousel
                title="Trending"
                category="popular"
            />
            {/* <Carousel
                title="Upcoming"
                category="upcoming"
            />
            <Carousel
                title="Top Rated"
                category="top_rated"
            /> */}
        </Layout>
    );
};

export default HomePage;