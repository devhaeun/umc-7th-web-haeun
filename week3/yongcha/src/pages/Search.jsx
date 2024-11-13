import { useEffect, useState } from "react";
import WhiteTitle from "../components/WhiteTitle";
import useCustomFetch from "../hooks/useCustomFetch";
import CardContainer from "../components/CardContainer";
import MovieCard from "../components/MovieCard";
import SkeletonCard from "../components/SkeletonCard";
import styled from "styled-components";
import StyledBtn from "../components/StyledBtn";

const Search = () => {
    const [searchValue, setSearchValue] = useState('');
    const [searchDebouncedValue, setSearchDebouncedValue] = useState('');
    const {data:movies, isLoading, isError} = useCustomFetch(`/search/movie?query=`
        +searchDebouncedValue+`&include_adult=false&language=ko&page=1`);

    const onChange = (e) => {
        setSearchValue(e.target.value);
    };

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            setSearchDebouncedValue(searchValue);
        }, 500);

        return () => {
            clearTimeout(debounceTimer);
        }
    }, [searchValue]);

    if (isLoading) {
        return (
            <>
                <div>
                    <SearchInput
                    value={searchValue}
                    onChange={onChange}
                    placeholder="영화 제목을 입력해주세요"
                    />
                    <SearchBtn>검색</SearchBtn>
                </div>
                <CardContainer>
                    {Array(18).fill().map((v,i)=>(
                        <SkeletonCard key={i}/>
                    ))}
                </CardContainer>
            </>
        )
    }

    if (searchDebouncedValue && movies.data?.results.length == 0) {
        return (
            <>
                <div>
                    <SearchInput
                    value={searchDebouncedValue}
                    onChange={onChange}
                    placeholder="영화 제목을 입력해주세요"
                    />
                    <SearchBtn>검색</SearchBtn>
                </div>
                <WhiteTitle>'{searchDebouncedValue}'이(가) 현재 YONGCHA에 없습니다.</WhiteTitle>
            </>
        )
    }

    return (
        <>
            <div>
                <SearchInput
                value={searchValue}
                onChange={onChange}
                placeholder="영화 제목을 입력해주세요"
                />
                <SearchBtn>검색</SearchBtn>
            </div>
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

export default Search;

const SearchInput = styled.input`
    height: 3em;
    width: 87%;
    padding-left: 1em;
    margin-bottom: 20px;
`

const SearchBtn = styled(StyledBtn)`
    height: 3.3em;
    width: 8%;
    background-color: red;
    margin-left: 5px;
    position: relative;
    top: 1px;
`