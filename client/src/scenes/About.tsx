import Layout from "../components/Layout";

const About = () => {
    return (
        <Layout>
            <div className="w-screen text-gray-400">
                <span className="w-96 block m-auto text-center">
                    Hello there, 
                    <br/><br/>
                    This site leverages the TMDB API to fetch movie information including their rating, genres, overview, cast, reviews, and trailers. 
                    <br/><br/>
                    This web application is a personal project for the sole puporse of practicing various tools and frameworks. 
                    It is in no way intended for any commercial use.
                    <br/><br/>
                    Feel free to check out the source code <a href="https://github.com/JeffC25/movie-browser" className="underline font-semibold">here!</a>
                </span>
            </div>
        </Layout>
    );
};

export default About;