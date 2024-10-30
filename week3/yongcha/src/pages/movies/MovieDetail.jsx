import { useParams } from "react-router-dom";
import useCustomFetch from "../../hooks/useCustomFetch";
import styled from 'styled-components';

const basePath = 'https://image.tmdb.org/t/p/w500';

const MovieDetail = () => {
    const { movieId } = useParams();
    const { data:movieInfo, isLoading, isError} = useCustomFetch(`/movie/${movieId}?language=ko&append_to_response=images`);
    console.log('movieInfo: ',movieInfo);
    const { data:movieCasts } = useCustomFetch(`/movie/${movieId}/credits?language=ko`);
    console.log('movieCasts: ',movieCasts);

    if (movieInfo.length==0 || movieCasts.length==0) {
        console.log('empty');
        return
    }

    return (
        <>
        <MovieBackDrop url={`url(${basePath+movieInfo.data.back_drop})`}>
            <MovieInfoDiv>
                <h1>영화 제목</h1>
                <p>
                    평점 ??&nbsp;
                    개봉연도&nbsp;
                    nn분
                </p>
                <h3>영화 소개 문구</h3>
                <p>줄거리</p>
            </MovieInfoDiv>
        </MovieBackDrop>
        <div style={{color:"white"}}>
            <h1>감독/출연</h1>
        </div>
        </>
    );
}

export default MovieDetail;

const MovieBackDrop = styled.div`
    // background-image: ${props => props.url};
    background-color: red;
`
const MovieInfoDiv = styled.div`
    color: white;
`