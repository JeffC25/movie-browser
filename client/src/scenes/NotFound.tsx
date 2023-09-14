import Layout from "../components/Layout";

const NotFound = () => {
    return (
        <Layout>
            <div className="w-screen text-gray-400">
                <span className="w-96 m-auto text-center flex justify-center space-x-2 text-2xl">
                    <div className="font-semibold">404.</div><div>Page not found.</div>
                </span>
            </div>
        </Layout>
    );
};

export default NotFound;