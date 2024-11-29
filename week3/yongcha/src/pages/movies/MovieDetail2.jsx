import { useParams } from "react-router-dom";
// import useCustomFetch from "../../hooks/useCustomFetch";
import styled from 'styled-components';
import WhiteTitle from "../../components/WhiteTitle";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import { useQuery } from "@tanstack/react-query";
// import { fetchMovies } from "../../hooks/fetchMovies";
import { axiosInstance } from "../../apis/axios-instance";
import { Div2 } from "../HomePage";

const basePath = import.meta.env.VITE_BASE_PATH;

const MovieDetail2 = () => {
    const { movieId } = useParams();
    const { data:movieInfo, isLoading, isError} = useQuery({
        queryKey: ['movie_detail'],
        queryFn: async () => await axiosInstance.get(`/movie/${movieId}?language=ko&append_to_response=images`)
    })
    console.log('movieInfo: ',movieInfo);
    const { data:movieCasts } = useQuery({
        queryKey: ['movie_casts'],
        queryFn: async () => await axiosInstance.get(`/movie/${movieId}/credits?language=ko`)
    })
    console.log('movieCasts: ',movieCasts);

    if (!movieInfo || !movieCasts || isLoading) {
        console.log('empty');
        return (
        <>
            <Loading />
        </>
        )
    }
    if (isError) {
        return <Error />
    }

    return (
        <>
        <UpperContainer>
            <UpperLeftContainer>
                <WhiteTitle>{movieInfo.data.title}</WhiteTitle>
                <div>
                    <WhiteSpan>평균 {movieInfo.data.vote_average}</WhiteSpan>
                    <WhiteSpan>{movieInfo.data.release_date}</WhiteSpan>
                    <WhiteSpan>{movieInfo.data.runtime}분</WhiteSpan>
                    {movieInfo.data.genres.map(genre => (
                        <WhiteSpan key={genre.id}>{genre.name}</WhiteSpan>
                    ))}
                </div>
                <div style={{color:"lightgrey"}}>
                    {movieInfo.data.overview}
                </div>
                <button>구매하기</button>
                <button>선물하기</button>
            </UpperLeftContainer>
            <div>
                <img src={basePath+movieInfo.data.backdrop_path} alt="" />
                <div>
                    <button>보고싶어요</button>
                    <button>평가하기</button>
                    <button>용챠파티</button>
                    <button>더보기</button>
                </div>
            </div>
        </UpperContainer>
        <Div2 />
        <div>
            <StickyMenu>
                <button>콘텐츠 정보</button>
                <button>관련 콘텐츠</button>
            </StickyMenu>
            <div style={{color:"white"}}>관련 동영상</div>
            <div style={{color:"white"}}>감독/출연</div>
        </div>
        </>
    );
}

export default MovieDetail2;

const UpperContainer = styled.div`
    display: flex;
    justify-content: space-between;
`
const UpperLeftContainer = styled.div`
    width: 440px;
`

const WhiteSpan = styled.span`
    color: lightgrey;
    margin-right: 10px;
`

const StickyMenu = styled.div`
    height: 50px;
    display: flex;
    justify-content: center;
    position: sticky;
`