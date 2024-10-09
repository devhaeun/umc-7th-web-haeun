// import { Link } from "react-router-dom";
import styled from 'styled-components';
import StyledLink from "./StyledLink";

const Navbar = () => {
    return (
        <YongchaNav>
            <span>
                <StyledLink to='/'>
                    <LogoSpan>
                        YONGCHA
                    </LogoSpan>
                </StyledLink>
                </span>
            <span>
                <StyledLink to='/login'>
                    <StyledBtn color2={'rgb(48,48,48)'}>로그인</StyledBtn>
                </StyledLink>
                <StyledLink to='/signup'>
                <StyledBtn color={'red'} color2={'rgb(204,41,0)'}>회원가입</StyledBtn>
                </StyledLink>
            </span>
        </YongchaNav>
    );
};

export default Navbar;

const YongchaNav = styled.nav`
    background-color: black;
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-grow: 1;
`

const LogoSpan = styled.span`
    color: red;
    font-size: 1.3em;
    font-weight: bold;
    padding: 5px;
    margin: 10px;
`

const StyledBtn = styled.button`
    background-color: ${props => props.color || 'black'};
    &:hover {
        background-color: ${props => props.color2}
    };
    border: 1px solid grey;
    border-radius: 0.4em;
    padding: 8px 14px;
    cursor: pointer;
    color: white;
    margin-right: 15px;
`