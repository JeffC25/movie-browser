import { ReactNode, useEffect, useState } from "react";
import { DefaultService, Review } from "../../api";

const reviewCard = (review: Review) => {
    return (
        <div className="block w-full bg-[rgba(32,32,32,0.25)] p-2 snap-end">
            <span className="block font-semibold">{`Rating: ${review.rating}`}</span>
            <span className="block break-words">{review.content}</span>
        </div>
    );
};

const ReviewList = (id: number) => {
    const [reviews, setReviews] = useState<ReactNode[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);

    useEffect(() => {
        DefaultService.getMovieReviews(id, currentPage)
        .then((result) => {
            setReviews(result.results.map(reviewCard));
            setTotalPages(result.totalPages);
        })
        .catch((error) => {
            console.error('Error: ', error);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function clickHandler() {
        console.log("clicked")
        setCurrentPage(currentPage + 1)
        DefaultService.getMovieReviews(id, currentPage)
        .then((result) => {
            setReviews(reviews.concat(result.results.map(reviewCard)));
        })
        .catch((error) => {
            console.error('Error: ', error);
        });
    }

    return (
        <div className="overflow-y-scroll w-full h-full space-y-2 snap-y">
            {reviews}
            <button type="button" onClick={clickHandler} className={`block w-full bg-[rgba(32,32,32,0.25)] rounded-lg p-2 ${currentPage >= totalPages ? "hidden" : ""}`}>Show more</button>
        </div>
    );
};

export default ReviewList;