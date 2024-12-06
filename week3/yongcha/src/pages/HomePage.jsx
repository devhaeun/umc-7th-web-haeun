import styled from "styled-components";
import WhiteTitle from "../components/WhiteTitle";
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import { useContext } from "react";
import Block from "../components/Block";
import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "../hooks/fetchMovies";
import { useNavigate } from "react-router-dom";

const LeftArrow = () => {
    const visibility = useContext(VisibilityContext);
    const isFirstItemVisible = visibility.useIsVisible('first', true);
    return (
        <ArrowButton
        disabled={isFirstItemVisible}
        onClick={() => visibility.scrollPrev()}
        >
            &lt;
        </ArrowButton>
    );
};

const RightArrow = () => {
    const visibility = useContext(VisibilityContext);
    const isFirstItemVisible = visibility.useIsVisible('last', false);
    return (
        <ArrowButton
        disabled={isFirstItemVisible}
        onClick={() => visibility.scrollNext()}
        >
            &gt;
        </ArrowButton>
    );
}

const basePath = import.meta.env.VITE_BASE_PATH;
const basePathLarge = import.meta.env.VITE_BASE_PATH_LARGE;

const HomePage = () => {
    const { data:movies, isLoading, isError } = useQuery({
        queryKey: ['popular-movies'],
        queryFn: () => fetchMovies({category:'popular', pageParam:'1'})
    });
    const { data:upcomingMovies } = useQuery({
        queryKey: ['upcoming-movies'],
        queryFn: () => fetchMovies({category:'upcoming', pageParam:'1'})
    });

    const navigate = useNavigate();

    return (
        <>
        <ScrollContainer height={'551px'}>
            <ScrollMenu
            LeftArrow={LeftArrow}
            RightArrow={RightArrow}>
                {movies?.results.slice(0,8).map(movie => (
                    <Div1 key={movie.id}>
                        <BigImg
                        src={basePathLarge+movie.backdrop_path}
                        onClick={() => {
                            navigate(`/movies/${movie.id}`, {
                                state: { movieId: movie.id },
                            })
                        }}
                        />
                    </Div1>
                ))}
            </ScrollMenu>
        </ScrollContainer>
        <div style={{display:'flex'}}>
            <Block />
            <Div2>광고배너</Div2>
            <Block />
        </div>
        <div>
            <WhiteTitle
            font_size={'20px'}
            margin_left={'30px'}
            margin_bottom={'10px'}
            >개별 구매 Top 20</WhiteTitle>
            <ScrollContainer height={'155px'}>
                <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
                    {movies?.results.map((movie,idx) => (
                        <Div3
                        key={movie.id}
                        onClick={() => {
                            navigate(`/movies/${movie.id}`, {
                                state: { movieId: movie.id },
                            })
                        }}
                        >
                            <TopRateSpan>{idx+1}</TopRateSpan>
                            <TopImg
                            src={basePath+movie.backdrop_path}
                            />
                        </Div3>
                    ))}
                </ScrollMenu>
            </ScrollContainer>
        </div>
        <div>
            <WhiteTitle
            font_size={'20px'}
            margin_left={'30px'}
            margin_bottom={'10px'}
            >개봉 예정인 콘텐츠</WhiteTitle>
            <ScrollContainer height={'163px'}>
                <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
                    {upcomingMovies?.results.map((movie) => (
                        <Div4 key={movie.id}>
                            <UpcomingImg
                            onClick={() => {
                                navigate(`/movies/${movie.id}`, {
                                    state: { movieId: movie.id },
                                })
                            }}
                            src={basePath+movie.backdrop_path}
                            />
                        </Div4>
                    ))}
                </ScrollMenu>
            </ScrollContainer>
        </div>
        </>
    );
};

export default HomePage;

const TopImg = styled.img`
    width: 276px;
    border-radius: 8px;
`
const UpcomingImg = styled.img`
    width: 300px;
`
const TopRateSpan = styled.span`
    color: white;
    font-size: 3em;
    font-weight: bold;
`

const ScrollContainer = styled.div`
    overflow: hidden;
    .react-horizontal-scrolling-menu--scroll-container::-webkit-scrollbar {
        display: none;
    }
    .react-horizontal-scrolling-menu--scroll-container {
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
    }
    height: ${({height}) => `${height};`}
    margin-bottom: 25px;
`

const ArrowButton = styled.button`
    cursor: pointer;
    color: white;
    width: 30px;
    height: 100%;
    background-color: rgb(28, 40, 51);
    // background-color: darkgrey;
    border: none;
    z-index: 1;
    &:disabled {
        cursor: default;
        color: grey;
    }
`

const Div1 = styled.div`
    // background-color: grey;
    width: 980px;
    height: 551px;
    border-radius: 8px;
    margin-right: 20px;
    overflow: hidden;
    position: relative;
`
const BigImg = styled.img`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    &:hover {
        cursor: pointer;
    }
`

export const Div2 = styled.div`
    height: 80px;
    width: 100%;
    background-color: darkred;
    border-radius: 8px;
    margin-bottom: 25px;
    display: inline-block;
`

const Div3 = styled.div`
    background-color: black;
    // border-radius: 8px;
    width: 320px;
    height: 155px;
    margin-right: 20px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    // padding-left: 10px;
    &:hover {
        cursor: pointer;
        filter: brightness(0.5);
    }
`

const Div4 = styled.div`
    overflow: hidden;
    // background-color: grey;
    border-radius: 8px;
    margin-right: 20px;
    width: 290px;
    height: 163px;
    &:hover {
        cursor: pointer;
        filter: brightness(0.5);
    }
`