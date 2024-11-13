import styled from "styled-components";
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
export default StyledBtn;