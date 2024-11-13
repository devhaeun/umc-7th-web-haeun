// import { useState } from 'react'
import styled from 'styled-components'

const SkeletonCard = () => {

    return (
        <MovieCardDiv>
            <SkeletonPoster/>
            <SkeletonTitle/>
            <SkeletonDate/>
        </MovieCardDiv>
    )
}

export default SkeletonCard;

const MovieCardDiv = styled.div`
    height: 230px;
    width: 120px;
`
const SkeletonPoster = styled.div`
    width: 120px;
    height: 173px;
    border-radius: 0.5em;
    // margin-bottom: 1.5px;
    background-color: grey;
`

const SkeletonTitle = styled.div`
    width: 120px;
    height: 0.8em;
    // color: white;
    // font-weight: bold;
    // font-size: 0.8em;
    // margin-left: 3px;
    background-color: grey;
    margin-top: 8px;
`

const SkeletonDate = styled.div`
    // color: white;
    width: 120px;
    height: 0.7em;
    background-color: grey;
    // font-size: 0.7em;
    // margin-left: 3px;
    margin-top: 2px;
`