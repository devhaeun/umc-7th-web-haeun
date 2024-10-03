import styled from "styled-components";
import { IoSearch } from 'react-icons/io5';
import { PiFilmSlateFill } from "react-icons/pi";
import StyledLink from "./StyledLink";

const Sidebar = () => {
    return (
        <SideContainer>
            <StyledLink to='/search'>
                <SidebarDiv><IconSpan><IoSearch /></IconSpan>찾기</SidebarDiv>
            </StyledLink>
            <StyledLink to='/movies'>
                <SidebarDiv><IconSpan><PiFilmSlateFill /></IconSpan>영화</SidebarDiv>
            </StyledLink>
        </SideContainer>
    )
}

export default Sidebar;

const SideContainer = styled.div`
    background-color: black;
    width: 200px;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
`

const SidebarDiv = styled.div`
    color: white;
    height: 50px;
    display: flex;
    align-items: center;
    padding-left: 15px;
    cursor: pointer;
    &:hover {
        background-color: rgba(80, 80, 80, 1);
    };
    border-radius: 10px;
`

const IconSpan = styled.span`
    margin-right: 7px;
    margin-top: 2.5px;
`