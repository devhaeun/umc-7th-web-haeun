import MovieCard from "../../components/MovieCard";
import CardContainer from '../../components/CardContainer';
import Error from "../../components/Error";
import { useState } from "react";
import SkeletonCardList from "../../components/SkeletonCardList";
import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "../../hooks/fetchMovies";
import { PageBtnDiv, PageSpan } from "../../components/pagination-style";
import StyledBtn from "../../components/StyledBtn";

const TopRated = () => {
    const [page, setPage] = useState(1);
    const {
        data:movies,
        isLoading,
        isError
    } = useQuery({
        queryKey: ['movies', 'top_rated', page],
        queryFn: () => fetchMovies({category:'top_rated', pageParam:page}),
        keepPreviousData: true,
    });

    if (isLoading) return (
        <CardContainer>
            <SkeletonCardList />
        </CardContainer>
    )
    if (isError) return <Error />

    return (
        <>
            <CardContainer>
                {movies?.results.map(movie => (
                    <MovieCard key={movie.id}
                    posterPath={movie.poster_path}
                    title={movie.title}
                    releaseDate={movie.release_date}
                    movieId={movie.id}
                    />
                ))}
            </CardContainer>
            <PageBtnDiv>
                <StyledBtn
                color={'red'} color2={'rgb(204,41,0)'}
                onClick={() => setPage(old => Math.max(old-1, 0))}
                disabled={page === 1}
                >
                    이전
                </StyledBtn>
                <PageSpan>{page}</PageSpan>
                <StyledBtn
                color={'red'} color2={'rgb(204,41,0)'}
                onClick={() => setPage(old => old+1)}
                disabled={ page === movies.total_pages }
                >
                    다음
                </StyledBtn>
            </PageBtnDiv>
        </>
    );
};

export default TopRated;