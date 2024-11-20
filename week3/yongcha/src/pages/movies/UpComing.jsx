import MovieCard from "../../components/MovieCard";
import CardContainer from '../../components/CardContainer';
// import useCustomFetch from "../../hooks/useCustomFetch";
// import Loading from "../../components/Loading";
import Error from "../../components/Error";
import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "../../hooks/fetchMovies";
// import ShowSkeletons from "../../components/ShowSkeletons";
import SkeletonCard from "../../components/SkeletonCard";

const UpComing = () => {
    // const {data:movies, isLoading, isError} = useCustomFetch(`/movie/upcoming?language=ko&page=1`);
    const {data:movies, isLoading, isError} = useQuery({
        queryKey: ['movies', 'now_playing'],
        queryFn: () => fetchMovies({category:'upcoming', pageParam:1})
    })
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
                {movies.results?.map((movie) => (
                    <MovieCard key={movie.id}
                    posterPath={movie.poster_path}
                    title={movie.title}
                    releaseDate={movie.release_date}
                    movieId={movie.id}
                    />
                ))}
            </CardContainer>
        </>
    );
};

export default UpComing;