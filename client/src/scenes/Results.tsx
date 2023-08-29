import { useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import SearchResults from "../components/movies/SearchResults";
import CategoryResults from "../components/movies/CategoryResults";

const Results = () => {
    const location = useLocation();
    const path = location.pathname
    const params = new URLSearchParams(location.search);

    return (
        <Layout>
            {path == "/search" ? <SearchResults query={params.get("query")!} page={params.get("page")!} /> : <CategoryResults category={params.get("category")!} page={params.get("page")!}/>}
        </Layout>
    );
};

export default Results;