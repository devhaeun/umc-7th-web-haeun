import MovieCard from "../../components/MovieCard";
import CardContainer from '../../components/CardContainer';
import useCustomFetch from "../../hooks/useCustomFetch";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

const NowPlaying = () => {
    const {data:movies, isLoading, isError} = useCustomFetch(`/movie/now_playing?language=ko&page=1`);
    if (isLoading) return <Loading />
    if (isError) return <Error />
    
    return (
        <>
            <CardContainer>
                {movies.data?.results.map((movie) => (
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

export default NowPlaying;