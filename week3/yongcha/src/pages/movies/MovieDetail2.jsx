import { useNavigate, useParams } from "react-router-dom";
// import useCustomFetch from "../../hooks/useCustomFetch";
import styled from 'styled-components';
import WhiteTitle from "../../components/WhiteTitle";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import { useQuery } from "@tanstack/react-query";
// import { fetchMovies } from "../../hooks/fetchMovies";
import { axiosInstance } from "../../apis/axios-instance";
import { Div2 } from "../HomePage";
import StyledBtn from "../../components/StyledBtn";
import { Fragment, useEffect, useState } from "react";
import CardContainer from "../../components/CardContainer";

const basePath = import.meta.env.VITE_BASE_PATH;

const MovieDetail2 = () => {
    const [menu, setMenu] = useState(0);
    const { movieId } = useParams();
    const { data:movieInfo, isLoading, isError, refetch:refetchInfo } = useQuery({
        queryKey: ['movie_detail'],
        queryFn: async () => await axiosInstance.get(`/movie/${movieId}?language=ko&append_to_response=images`)
    })
    console.log('movieInfo: ',movieInfo);
    const { data:movieVids, refetch:refetchVids } = useQuery({
        queryKey: ['movie_related_video'],
        queryFn: async () => await axiosInstance.get(`movie/${movieId}/videos?language=ko`)
    });
    console.log('movieVids:', movieVids)
    const { data:movieCasts, refetch:refetchCasts } = useQuery({
        queryKey: ['movie_casts'],
        queryFn: async () => await axiosInstance.get(`/movie/${movieId}/credits?language=ko`)
    })
    console.log('movieCasts: ',movieCasts);
    const { data:similarMovies, refetch:refetchSimilars } = useQuery({
        queryKey: ['movie_similar'],
        queryFn: async () => await axiosInstance.get(`/movie/${movieId}/similar?language=ko&page=1`)
    })
    console.log('similar-movies:', similarMovies);

    const navigate = useNavigate();

    const onClickInfo = () => {
        setMenu(0);
    };
    const onClickRelated = () => {
        setMenu(1);
    };

    useEffect(() => {
        refetchInfo();
        refetchVids();
        refetchCasts();
        refetchSimilars();
    }, [movieId, refetchInfo, refetchVids, refetchCasts, refetchSimilars]);

    if (!movieInfo || !movieCasts || !movieVids || !similarMovies || isLoading) {
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
                <WhiteTitle
                font_size={'40px'}
                margin_bottom={'13px'}
                >{movieInfo.data.title}</WhiteTitle>
                <LightgreyDiv>
                    <WhiteSpan first={'0'}>평균 {movieInfo.data.vote_average.toFixed(1)}</WhiteSpan>
                    ·
                    <WhiteSpan>{movieInfo.data.release_date}</WhiteSpan>
                    ·
                    <WhiteSpan>{movieInfo.data.runtime}분</WhiteSpan>
                    {movieInfo.data.genres.map(genre => (
                        <Fragment key={genre.id}>
                        ·
                        <WhiteSpan>{genre.name}</WhiteSpan>
                        </Fragment>
                    ))}
                </LightgreyDiv>
                <LightgreyDiv>
                    {movieInfo.data.overview}
                </LightgreyDiv>
                <StyledBtn
                color={'#f82f62;'}
                color2={'rgb(204,41,0)'}
                border={'none'}
                width={'105.86px'}
                height={'40px'}
                >
                    구매하기
                </StyledBtn>
                <StyledBtn
                color={'#f82f62;'}
                color2={'rgb(204,41,0)'}
                border={'none'}
                width={'105.86px'}
                height={'40px'}
                >선물하기
                </StyledBtn>
            </UpperLeftContainer>
            <UpperRightContainer>
                <img src={basePath+movieInfo.data.backdrop_path} alt="" />
                <OnImgDiv>
                    <BtnList>
                        <MovieDetailBtn>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" fillRule="evenodd" d="M12 2a.75.75 0 0 0-.75.75v8.5h-8.5a.75.75 0 0 0 0 1.5h8.5v8.5a.75.75 0 0 0 1.5 0v-8.5h8.5a.75.75 0 0 0 0-1.5h-8.5v-8.5A.75.75 0 0 0 12 2" clipRule="evenodd"></path></svg>
                            보고싶어요
                        </MovieDetailBtn>
                        <MovieDetailBtn>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" aria-hidden="true"><path stroke="currentColor" strokeWidth="1.5" d="m2.412 9.893-.524.537.524-.537L8.5 9.008a1 1 0 0 0 .753-.547l2.722-5.516 2.723 5.516a1 1 0 0 0 .752.547l6.078.883-4.452 4.292a1 1 0 0 0-.29.897l.725-.13-.726.13 1.087 6.048-5.432-2.855a1 1 0 0 0-.93 0l-5.445 2.862 1.04-6.063a1 1 0 0 0-.288-.885z"></path></svg>
                            평가하기
                        </MovieDetailBtn>
                        <MovieDetailBtn>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M11 10.002a1 1 0 1 0 0-2 1 1 0 0 0 0 2M9 9.002a1 1 0 1 1-2 0 1 1 0 0 1 2 0M14 10.002a1 1 0 1 0 0-2 1 1 0 0 0 0 2"></path><path fill="currentColor" fillRule="evenodd" d="M2 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8.323a2 2 0 0 1-2 2h-8l-3.284 3.371c-.626.643-1.716.2-1.716-.697v-2.674H4a2 2 0 0 1-2-2zm3 8.723a1.6 1.6 0 0 1 1.6 1.6v1.198l2.254-2.315A1.6 1.6 0 0 1 10 13.723h8a.4.4 0 0 0 .4-.4V5a.4.4 0 0 0-.4-.4H4a.4.4 0 0 0-.4.4v8.323c0 .22.18.4.4.4z" clipRule="evenodd"></path><path fill="currentColor" d="M10 17.523a.8.8 0 0 0 .8.8H15l3.284 3.373c.626.643 1.716.2 1.716-.698v-2.674h1a2 2 0 0 0 2-2.001v-5.52a.8.8 0 0 0-1.6 0v5.52a.4.4 0 0 1-.4.4h-1a1.6 1.6 0 0 0-1.6 1.6v1.198l-2.254-2.314A1.6 1.6 0 0 0 15 16.723h-4.2a.8.8 0 0 0-.8.8"></path></svg>
                            용챠파티
                        </MovieDetailBtn>
                        <MovieDetailBtn>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" fillRule="evenodd" d="M13.5 5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0M12 10.498a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m0 6.997a1.5 1.5 0 1 0-.001 2.999A1.5 1.5 0 0 0 12 17.495" clipRule="evenodd"></path></svg>
                            더보기
                        </MovieDetailBtn>
                    </BtnList>
                </OnImgDiv>
            </UpperRightContainer>
        </UpperContainer>
        <Div2 />
        <div>
            <StickyMenu>
                <StickyMenuBtn
                onClick={onClickInfo}
                clicked={(menu===0).toString()}
                >콘텐츠 정보</StickyMenuBtn>
                <StickyMenuBtn
                onClick={onClickRelated}
                clicked={(menu===1).toString()}
                >관련 콘텐츠</StickyMenuBtn>
            </StickyMenu>
            {
                menu===0 ?
                <>
                <SubTitle>관련 동영상</SubTitle>
                <VidList>
                {movieVids?.data.results.slice(0,4).map(vid =>(
                    <VidDiv key={vid.id}>
                        <VidImg
                        src={`https://img.youtube.com/vi/${vid.key}/0.jpg`}
                        width={'259'}
                        onClick={()=>window.open(`https://www.youtube.com/watch?v=${vid.key}`)}
                        />
                    </VidDiv>
                ))}
                </VidList>
                <SubTitle>감독/출연</SubTitle>
                <CastList>
                {
                    movieCasts?.data.cast.map(cast => (
                        <CastInnerList key={cast.id}>
                            <CastImgDiv>
                                <img
                                src={cast.profile_path?basePath+cast.profile_path:'/cast_no_img.svg'}
                                alt={cast.name}
                                width={'62px'}
                                />
                            </CastImgDiv>
                            <div>
                                <CastNameDiv
                                fontSize={'16px'}
                                color={'white'}
                                >{cast.name}</CastNameDiv>
                                <CastNameDiv
                                fontSize={'13px'}
                                color={'#84868d'}
                                >{cast.character}</CastNameDiv>
                            </div>
                        </CastInnerList>
                    ))
                }
                </CastList>
                </>
                :
                <>
                <SubTitle>비슷한 콘텐츠</SubTitle>
                <CardContainer>
                    {similarMovies?.data.results.map(movie => {
                        if (movie.poster_path) return <MoviePosterImg
                            key={movie.id}
                            src={basePath+movie.poster_path}
                            onClick={() => {
                                navigate(`/movies/${movie.id}`, {
                                    state: { movieId: movie.id },
                                })
                            }}
                            />
                        })
                    }
                </CardContainer>
                </>
            }
        </div>
        </>
    );
}

export default MovieDetail2;

const UpperContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
`
const UpperLeftContainer = styled.div`
    width: 440px;
    padding-top: 28px;
`
const UpperRightContainer = styled.div`
    position: relative;
`

const LightgreyDiv = styled.div`
    color: lightgrey;
    margin-bottom: 15px;
    font-size: 15px;
    line-height: 23px;
    // overflow: hidden;
    // text-overflow: ellipsis;
    // display: -webkit-box;
    // -webkit-line-clamp: 3;
    // -webkit-box-orient: vertical;
`

const WhiteSpan = styled.span`
    color: lightgrey;
    margin: ${({ first }) => `0 10px 0 ${first || '10px'}`};
    font-size: 15px;
`

const OnImgDiv = styled.div`
    &:before {
        content: "";
        background: linear-gradient(90deg, #000 5%, #000000b3 30%, #00000073 50%, #0003 80%, #0000 100%);
        width: 70%;
        height: 102%;
        position: absolute;
        top: -2%;
        left: -3%;
    };
    &:after {
        content: "";
        background: linear-gradient(#0000 0%, #00000073 30%, #000c 55%, #000000e6 68%, #000 86%);
        width: 100%;
        height: 74%;
        position: absolute;
        top: 26%;
        left: 0;
    };
`

const BtnList = styled.ul`
    display: flex;
    position: absolute;
    right: 0;
    bottom: 10px;
`

const MovieDetailBtn = styled.button`
    width: 70px;
    height: 64px;
    position: relative;
    z-index: 10;
    color: lightgrey;
    background-color: transparent;
    border: none;
    border-radius: 4px;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    &:hover {
        cursor: pointer;
        background-color: #ffffff1a;
    }
`

const StickyMenu = styled.div`
    height: 50px;
    display: flex;
    justify-content: center;
    position: sticky;
    top: 70px;
    background-color: black;
    z-index: 1;
    margin-bottom: 24px;
`
const StickyMenuBtn = styled.button`
    background-color: transparent;
    color: ${({ clicked }) => (clicked==='true') ? 'white' : '#4f5152'};
    border: none;
    border-bottom: ${({ clicked }) => (clicked==='true') ? '2.5px solid white' : 'none'};
    padding: 14px 20px;
    font-size: 15px;
    &:hover {
        cursor: pointer;
    };
`

const SubTitle = styled.h2`
    color: white;
    font-size: 20px;
    margin-bottom: 10px;
`

const VidList = styled.ul`
    margin-bottom: 32px;
`
const VidDiv = styled.div`
    border-radius: 4px;
    margin-right: 12px;
    display: inline-block;
    overflow: hidden;
    vertical-align: middle;
    height: 146px;
    // border: 1px solid red;
    &:hover {
        cursor: pointer;
    };
`
const VidImg = styled.img`
    position: relative;
    top: -25px;
`

const CastList = styled.ul`
    display: grid;
    grid-column-gap: 20px;
    grid-template-columns: repeat(2, 1fr);
`
const CastInnerList = styled.li`
    display: flex;
    align-items: center;
    height: 78px;
`
const CastImgDiv = styled.div`
    width: 62px;
    height: 62px;
    overflow: hidden;
    border-radius: 50%;
    text-align: center;
    margin-right: 14px;
`
const CastNameDiv = styled.div`
    font-size: ${({ fontSize }) => fontSize};
    color: ${({ color }) => color};
    margin-bottom: 2px;
`

const MoviePosterImg = styled.img`
    width: 169px;
    height: 250px;
    border-radius: 0.5em;
    margin-bottom: 1.5px;
    &:hover {
        cursor: pointer;
        filter: brightness(0.5);
    }
`