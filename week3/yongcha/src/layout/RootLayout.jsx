import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from '../components/Sidebar';
import styled from "styled-components";

const RootLayout = () => {
    return (
        <ScrollDiv>
            <RootContainer>
                <Navbar />
                <MainContainer>
                    <Sidebar />
                    <OutletContainer>
                        <Outlet />
                    </OutletContainer>
                </MainContainer>
            </RootContainer>
        </ScrollDiv>
    )
};

export default RootLayout;

const RootContainer = styled.div`
    height: 100vh;
    min-width: 540px;
`

const MainContainer = styled.div`
    background-color: rgb(28, 40, 51);
    height: auto;
    min-height: 100%;
    display: flex;
`

const OutletContainer = styled.div`
    // display: inline-block;
    padding: 20px;
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