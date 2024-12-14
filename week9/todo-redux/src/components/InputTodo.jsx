import { useState } from "react";
import { useDispatch } from "react-redux";
import { add } from "../todoSlice";
import styled from "styled-components";

const InputTodo = () => {
    const dispatch = useDispatch();

    const [todos, setTodos] = useState(
        {
            id: 0,
            text: "",
        }
    );

    const onReset = () => setTodos({text: ""});
    const onSubmit = (e) => {
        e.preventDefault();
        if (todos.text !== "") dispatch(add(todos.text));
        else (alert("할 일을 입력해주세요!"))
        onReset();
    }

    const handleText = (e) => setTodos({text: e.target.value});

    return (
        <>
        <form onSubmit={onSubmit}>
            <div>
                <InputText
                type="text"
                value={todos.text}
                onChange={handleText}
                />
                <InputBtn type="submit" value={"+"} />
            </div>
        </form>
        </>
    )
}

export default InputTodo;

const InputText = styled.input`
    width: 300px;
    height: 30px;
    border: 2.3px solid skyblue;
    border-radius: 10px;
    margin-right: 10px;
`

const InputBtn = styled.input`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: none;
    background-color: lightblue;
    &:hover {
        background-color: skyblue;
        cursor: pointer;
    }
`