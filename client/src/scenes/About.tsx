import Layout from "../components/Layout";

const About = () => {
    return (
        <Layout>
            <div className="w-screen text-gray-400">
                <span className="w-96 block m-auto text-center">
                    Hello, 
                    <br/><br/>
                    This site leverages the TMDB API to fetch movie information including their rating, genres, overview, cast, reviews, and trailers. 
                    <br/><br/>
                    Information courtesy of
                    IMDb
                    (https://www.imdb.com).
                    Used with permission.
                    <br/><br/>
                    Feel free to check out the source code <a href="https://github.com/JeffC25/movie-browser" className="underline font-semibold">here!</a>
                </span>
            </div>
        </Layout>
    );
};

export default About;