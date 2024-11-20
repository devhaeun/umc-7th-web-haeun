import MovieCard from "../../components/MovieCard";
import CardContainer from '../../components/CardContainer';
import Error from "../../components/Error";
import SkeletonCard from "../../components/SkeletonCard";
import useGetInfinite from "../../hooks/useGetInfinite";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import SyncLoader from "react-spinners/SyncLoader";

const UpComing = () => {
    const {
        data:movies,
        isLoading,
        isError,
        isFetching,
        hasNextPage,
        fetchNextPage
    } = useGetInfinite({category:'upcoming'});
    const {ref, inView} = useInView({
        threshold: 0,
    })

    useEffect(() => {
        if (inView) {
            !isFetching && hasNextPage && fetchNextPage();
        }
    }, [inView, isFetching, hasNextPage, fetchNextPage]);
    
    if (isLoading) return (
        <>
        <CardContainer>
            {Array(18).fill().map((v,i) => (
                <SkeletonCard key={i}/>
            ))}
        </CardContainer>
        </>
    )
    if (isError) return <Error />

    return (
        <>
            <CardContainer>
                {movies?.pages.map((page) => {
                    return page.results.map(movie => (
                        <MovieCard key={movie.id}
                        posterPath={movie.poster_path}
                        title={movie.title}
                        releaseDate={movie.release_date}
                        movieId={movie.id}
                        />
                    ))
                })}
            </CardContainer>
            <div ref={ref}>
                {isFetching && <SyncLoader color="white" />}
            </div>
        </>
    );
};

export default UpComing;