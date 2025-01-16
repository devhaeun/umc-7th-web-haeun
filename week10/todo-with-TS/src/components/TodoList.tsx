import { TTodo } from "../types/todo";
import CheckBox from "./CheckBox";

interface ITodoList {
    todos: TTodo[];
    onToggleTodo: (id:number) => void;
};

const TodoList = ({ todos, onToggleTodo }:ITodoList) => {
    console.log(todos);
    return (
        <>
        <ul>
            {todos.map(todo => {
                return (
                    <li key={todo.id}>
                        <CheckBox
                        id={todo.id}
                        label={todo.text}
                        checked={todo.checked}
                        onChange={()=>onToggleTodo(todo.id)}
                        />
                    </li>
                )
            })}
        </ul>
        </>
    )
}

export default TodoList;