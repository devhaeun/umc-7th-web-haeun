import styled from "styled-components";
const StyledBtn = styled.button`
    background-color: ${props => props.color || 'black'};
    &:hover {
        background-color: ${props => props.color2};
        color: lightgrey;
    };
    border: ${props => `1px solid ${props.border || 'grey'}`};
    border-radius: 0.4em;
    padding: 8px 14px;
    cursor: pointer;
    color: white;
    margin-right: 15px;
    width: ${props => props.width || 'auto'};
    height: ${props => props.height || 'auto'};
`
export default StyledBtn;