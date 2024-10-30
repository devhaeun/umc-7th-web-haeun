import { useParams } from "react-router-dom";
import useCustomFetch from "../../hooks/useCustomFetch";
import styled from 'styled-components';
import WhiteTitle from "../../components/WhiteTitle";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

const basePath = import.meta.env.VITE_BASE_PATH;

const MovieDetail = () => {
    const { movieId } = useParams();
    const { data:movieInfo, isLoading, isError} = useCustomFetch(`/movie/${movieId}?language=ko&append_to_response=images`);
    console.log('movieInfo: ',movieInfo);
    const { data:movieCasts } = useCustomFetch(`/movie/${movieId}/credits?language=ko`);
    console.log('movieCasts: ',movieCasts);

    if (movieInfo.length==0 || movieCasts.length==0 || isLoading) {
        console.log('empty');
        return <Loading />
    }
    if (isError) {
        return <Error />
    }

    return (
        <>
            <MovieInfoDiv>
                <Poster src={basePath+movieInfo.data.poster_path} alt="movie poster" width={300} />
                <MovieInfoSection>
                    <h1>{movieInfo.data.title}</h1>
                    <p>
                        평점 {movieInfo.data.vote_average.toFixed(1)}<br/>
                        {movieInfo.data.release_date}<br/>
                        {movieInfo.data.runtime}분
                    </p>
                    <Tagline>{movieInfo.data.tagline}</Tagline>
                    <p>{movieInfo.data.overview}</p>
                    {movieInfo.data.genres.map(v => (
                        <Genre key={v.id}>{v.name}</Genre>
                    ))}
                </MovieInfoSection>
            </MovieInfoDiv>
        <div>
            <WhiteTitle>감독/출연</WhiteTitle>
            <Casts>
                {movieCasts.data.cast.map(v => (
                    <CastDiv key={v.id}>
                        <CastImg
                        src={v.profile_path?basePath+v.profile_path:'/cast_no_img.svg'}
                        alt={v.name} height={168}/>
                        <NameDiv>
                            <b>{v.name}</b>
                            <CharName>{v.character}</CharName>
                        </NameDiv>
                    </CastDiv>
                ))}
            </Casts>
        </div>
        </>
    );
}

export default MovieDetail;

const NameDiv = styled.div`
    padding: 2px 6px 10px;
`

const CharName = styled.div`
    font-size: 0.7em;
`

const Casts = styled.div`
    display: flex;
    flex-wrap: wrap;
    row-gap: 1.3em;
    max-width: 1300px;
`

const CastDiv = styled.div`
    background-color: white;
    width: 7em;
    margin-right: 1em;
    border-radius: 0.2em;
`

const CastImg = styled.img`
    width: 7em;
    border-radius: 0.2em 0.2em 0 0;

`

const MovieInfoDiv = styled.div`
    display: flex;
    column-gap: 20px;
    padding-right: 2em;
    max-height: 429.6px;
    margin-bottom: 1.5em;
`

const Poster = styled.img`
    border-radius: 0.5em;
`

const MovieInfoSection = styled.div`
    color: white;
    line-height: 1.9em;
    max-height: 429.6px;
    min-width: 500px;
`

const Tagline = styled.h3`
    font-style: italic;
`

const Genre = styled.div`
    display: inline-block;
    color: lightgrey;
    border: 1.6px solid grey;
    border-radius: 0.3em;
    padding: 0.01em 0.5em;
    margin-right: 0.3em;
    margin-top: 0.5em;
    font-size: 0.8em;
    min-width: 3em;
    text-align: center;
    &:hover {
        background-color: rgba(75,75,75,0.7);
        cursor: pointer;
    }
`