import WhiteTitle from "../../components/WhiteTitle";
import styled from "styled-components";
import StyledLink from "../../components/StyledLink";

const Category = () => {
    return (
        <>
            <WhiteTitle>카테고리</WhiteTitle>
            <CategoryContainer>
                <StyledLink to='/movies/now-playing'>
                    <CategoryCard url={'url(/category_img1.jpg)'}>
                        <CategoryTitle>현재 상영중인</CategoryTitle>
                    </CategoryCard>
                </StyledLink>
                <StyledLink to='/movies/popular'>
                    <CategoryCard url={'url(/category_img2.jpg)'}>
                        <CategoryTitle>인기있는</CategoryTitle>
                    </CategoryCard>
                </StyledLink>
                <StyledLink to='/movies/top-rated'>
                    <CategoryCard url={'url(/category_img3.jpg)'}>
                        <CategoryTitle>높은 평가를 받은</CategoryTitle>
                    </CategoryCard>
                </StyledLink>
                <StyledLink to='/movies/up-coming'>
                    <CategoryCard url={'url(/category_img4.jpg)'}>
                        <CategoryTitle>개봉 예정중인</CategoryTitle>
                    </CategoryCard>
                </StyledLink>
            </CategoryContainer>
        </>
    );
};

export default Category;

const CategoryContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    column-gap: 15px;
    row-gap: 15px;
    margin-top: 25px;
`

const CategoryCard = styled.div`
    width: 300px;
    height: 200px;
    background-color: white;
    border-radius: 0.6em;
    overflow: hidden;
    background-image: ${props => props.url};
    background-size: 300px;
    background-position: center;
    cursor: pointer;
    &:hover {
        background-size: 320px;
        font-size: 1.03em;
    };
    position: relative;
`

const CategoryTitle = styled.div`
    background-color: rgba(0, 0, 0, 0.67);
    color: white;
    font-size: 0.8em;
    display: inline-block;
    padding: 5px;
    border-radius: 0.3em;
    position: absolute;
    bottom: 7px;
    left: 15px;
`