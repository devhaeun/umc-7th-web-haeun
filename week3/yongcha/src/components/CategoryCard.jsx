import StyledLink from "./StyledLink";
import styled from "styled-components";

const CategoryCard = ({routeLink, imgURL, title}) => {
    return (
        <>
            <StyledLink to={routeLink}>
                <CategoryCardDiv url={imgURL}>
                    <CategoryTitle>{title}</CategoryTitle>
                </CategoryCardDiv>
            </StyledLink>
        </>
    )
}

export default CategoryCard;

const CategoryCardDiv = styled.div`
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
    margin-bottom: 15px;
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