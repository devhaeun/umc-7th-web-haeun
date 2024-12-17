import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchMovies } from "../queries/fetchMovies";

const HomePage = () => {

    return (
        <>
        <Link to='/'>홈</Link>
        <Link to='/login'>로그인</Link>
        <Link to='/signup'>회원가입</Link>
        <Link to='/search'>검색</Link>
        <Link to='/movies'>카테고리</Link>
        <Link to='/movies/now-playing'>NowPlaying</Link>
        <Link to='/movies/popular'>Popular</Link>
        <Link to='/movies/top-rated'>TopRated</Link>
        <Link to='/movies/up-coming'>Upcoming</Link>
        <Link to='/movies/:movieId'>상세페이지</Link>
        </>
    )
};

export default HomePage;