import { useDispatch, useSelector } from "react-redux";
import { complete, remove } from "../todoSlice";
import styled from "styled-components";

const TodoList = () => {
    const todolist = useSelector(state => state.todo);
    const dispatch = useDispatch();

    const todolistView = todolist.map((todo) => (
        <Li key={todo.id}>
            <Div>
                <CheckBox
                type="checkbox"
                onChange={()=>dispatch(complete(todo.id))}
                />
                <Text>{todo.complete === false ? <>{todo.text}</> : <del>{todo.text}</del>}</Text>
            </Div>
            <DelBtn type="button" onClick={() => dispatch(remove(todo.id))}>X</DelBtn>
        </Li>
    ));

    return (
        <>
        <Ul>{todolistView}</Ul>
        </>
    )
}

export default TodoList;

const Li = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 20em;
    height: 40px;
`

const CheckBox = styled.input`
    &:checked {
        
    }
`

const Div = styled.div`
    display: flex;
`

const Text = styled.div`
    padding-left: 0.5em;
`

const DelBtn = styled.button`
    background-color: lightblue;
    border: none;
    border-radius: 3px;
    font-size: 10px;
    width: 18px;
    height: 18px;
    &:hover {
        background-color: skyblue;
        cursor: pointer;
    }
`

const Ul = styled.ul`
    padding: 0;
`