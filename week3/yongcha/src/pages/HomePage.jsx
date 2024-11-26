import styled from "styled-components";
import WhiteTitle from "../components/WhiteTitle";

const HomePage = () => {
    return (
        <>
        <BigPosterDiv>
            <Div1>1</Div1>
            <Div1>2</Div1>
            <Div1>3</Div1>
            <Div1>4</Div1>
        </BigPosterDiv>
        <div>
            <Div2>광고배너</Div2>
        </div>
        <div>
            <Div3>개별 구매 Top 20</Div3>
        </div>
        <div>
            <Div4>새로 올라온 콘텐츠</Div4>
        </div>
        </>
    );
};

export default HomePage;

const BigPosterDiv = styled.div`
    display: flex;
    flex-wrap: nowrap;
    overflow: hidden;
`

const Div1 = styled.div`
    background-color: grey;
    width: 966px;
    height: 543px;
    border-radius: 8px;
    margin-bottom: 25px;
`

const Div2 = styled.div`
    height: 80px;
    width: 100%;
    background-color: grey;
    border-radius: 8px;
    margin-bottom: 25px;
`

const Div3 = styled.div`
    background-color: grey;
    border-radius: 8px;
    width: 338px;
    height: 155px;
    margin-bottom: 25px;
`

const Div4 = styled.div`
    background-color: grey;
    border-radius: 8px;
    margin-bottom: 25px;
    width: 290px;
    height: 163px;
`