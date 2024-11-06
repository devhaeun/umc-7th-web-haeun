import styled from "styled-components";

const ErrorMessage = styled.p`
    // margin-top: -10px;
    margin-top: 5px;
    margin-bottom: 10px;
`

const CenterDiv = styled.div`
    text-align: center;
    position: absolute;
    // top: 50%;
    left: 50%;
    padding-top: 5em;
    transform: translateX(-50%);
    // transform: translate(-50%, -50%);
`

const StyledInput = styled.input`
    width: 25em;
    height: 3em;
    border-radius: 5px;
    padding: 0 5px;
    // margin-bottom: 10px;
`
const SubmitInput = styled.input`
    width: 25em;
    height: 3em;
    border-radius: 5px;
    background-color: red;
    color: white;
    &:hover {
        cursor: pointer;
    }
`

export default {ErrorMessage, CenterDiv, StyledInput, SubmitInput};