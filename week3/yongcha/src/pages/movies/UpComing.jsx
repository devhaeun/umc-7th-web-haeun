import MovieCard from "../../components/MovieCard";
import CardContainer from '../../components/CardContainer';
import useCustomFetch from "../../hooks/useCustomFetch";

const UpComing = () => {
    const {data:movies, isLoading, isError} = useCustomFetch(`/movie/upcoming?language=ko&page=1`);

    return (
        <>
            <CardContainer>
                {movies.data?.results.map((movie) => (
                    <MovieCard key={movie.id}
                    posterPath={movie.poster_path}
                    title={movie.title}
                    releaseDate={movie.release_date}
                    />
                ))}
            </CardContainer>
        </>
    );
};

export default UpComing;