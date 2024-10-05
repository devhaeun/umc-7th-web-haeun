// import { useState } from 'react'
import styled from 'styled-components'

const basePath = 'https://image.tmdb.org/t/p/w500';

const MovieCard = ({posterPath, title, releaseDate}) => {
    return (
        <MovieCardDiv>
            <MoviePosterImg src={basePath+posterPath} />
            <MovieTitle>{title}</MovieTitle>
            <MovieDate>{releaseDate}</MovieDate>
        </MovieCardDiv>
    )
}

export default MovieCard

const MovieCardDiv = styled.div`
    height: 230px;
    width: 120px;
`

const MoviePosterImg = styled.img`
    width: 120px;
    height: 173px;
    // min-height: 150px;
    border-radius: 0.5em;
    margin-bottom: 1.5px;
    &:hover {
        cursor: pointer;
        filter: brightness(0.5);
    }
`

const MovieTitle = styled.div`
    max-width: 130px;
    color: white;
    font-weight: bold;
    font-size: 0.8em;
    margin-left: 3px;
`

const MovieDate = styled.div`
    color: white;
    font-size: 0.7em;
    margin-left: 3px;
`