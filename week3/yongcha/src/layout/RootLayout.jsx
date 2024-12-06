import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import styled from "styled-components";

const RootLayout = () => {
    const location = useLocation();
    const isHome = location.pathname === '/'
    return (
        <ScrollDiv>
            <RootContainer>
                <FixedHeader>
                    <Navbar />
                </FixedHeader>
                <MainContainer padding={isHome.toString()}>
                    <Outlet />
                </MainContainer>
            </RootContainer>
        </ScrollDiv>
    )
};

export default RootLayout;

const FixedHeader = styled.header`
    position: fixed;
    z-index: 11;
    width: 100%;
`

const RootContainer = styled.div`
    height: 100vh;
    min-width: 1100px;
`

const MainContainer = styled.div`
    // padding: 90px 40px 20px 40px;
    ${({ padding }) => {
        const paddingLR = padding==="true" ? '10px' : '40px';
        return `padding: 90px ${paddingLR} 20px ${paddingLR};`
    }}
    // background-color: rgb(28, 40, 51);
    background-color: black;
    height: auto;
    min-height: 100%;
    position: relative;
    min-width: 900px;
    display: flex;
    flex-direction: column;
`

const ScrollDiv = styled.div`
    overflow-y: auto;
    &::-webkit-scrollbar {
        width: 8px;
        height: 8px;
        border-radius: 6px;
    }
    
    &::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.4)
    }

    &::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.3);
        border-radius: 6px;
    }
`;