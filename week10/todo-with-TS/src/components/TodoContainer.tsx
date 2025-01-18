import { useTodoContext } from "../context/TodoContext";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

const TodoContainer = () => {
    const { todos, onAddTodo, onToggleTodo } = useTodoContext();
    return (
        <>
        <TodoInput onAddTodo={onAddTodo} />
        <TodoList todos={todos} onToggleTodo={onToggleTodo} />
        </>
    )
}

export default TodoContainer;