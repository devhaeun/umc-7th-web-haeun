import styled from 'styled-components';
import StyledLink from "./StyledLink";
import { useEffect, useState } from 'react';
import StyledBtn from './StyledBtn';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const getUser = async ({accessToken}) => {
    try {
        const { data } = await axios.get('http://localhost:3000/user/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return data;
    } catch (error) {
        console.error(error);
    }
};

const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const accessToken = localStorage.getItem('accessToken');
    const navigate = useNavigate();

    const { data: userInfo } = useQuery({
        queryKey: ['userInfo'],
        queryFn: () => getUser({accessToken}),
        enabled: isAuthenticated,
    });

    const nickname = userInfo?.email.split('@', 1);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken) {
            setIsAuthenticated(true);
        };
    }, []);

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setIsAuthenticated(false);
    };

    return (
        <YongchaNav>
            <MarginSpan left={'40px'}>
                <StyledLink to='/'>
                    <LogoSpan>
                        YONGCHA
                    </LogoSpan>
                </StyledLink>
                <MarginSpan left={'40px'}>
                    <StyledLink to='/search'>
                        <WhiteSpan>검색</WhiteSpan>
                    </StyledLink>
                    <StyledLink to='movies'>
                        <WhiteSpan>카테고리</WhiteSpan>
                    </StyledLink>
                </MarginSpan>
            </MarginSpan>
            <MarginSpan right={'40px'}>
                {isAuthenticated ? (
                    <>
                    <WhiteSpan>{nickname}님 환영합니다</WhiteSpan>
                    <StyledLink>
                        <StyledBtn onClick={logout} color2={'rgb(48,48,48)'}>로그아웃</StyledBtn>
                    </StyledLink>
                    </>
                    ) : (
                        <>
                            <StyledBtn
                            color2={'rgb(48,48,48)'}
                            onClick={()=>navigate('/login')}
                            >로그인</StyledBtn>
                            <StyledBtn
                            color={'red'}
                            color2={'rgb(204,41,0)'}
                            onClick={()=>navigate('/signup')}
                            >회원가입</StyledBtn>
                        </>
                    )
                }
            </MarginSpan>
        </YongchaNav>
    );
};

export default Navbar;

const WhiteSpan = styled.div`
    color: white;
    margin-right: 20px;
    &:hover {
        background-color: grey;
    }
`

const YongchaNav = styled.nav`
    background-color: black;
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-grow: 1;
    padding-top: 5px;
`

const LogoSpan = styled.span`
    color: red;
    font-size: 1.3em;
    font-weight: bold;
    padding: 5px;
    // margin: 10px;
`

const MarginSpan = styled.span`
    margin-left: ${props => props.left || '0'};
    margin-right: ${props => props.right || '0'};
`