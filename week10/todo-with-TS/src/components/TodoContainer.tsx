import { useState } from "react";
import { TTodo } from "../types/todo";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

const TodoContainer = () => {
    const [todos, setTodos] = useState<TTodo[]>([{
        id: 1,
        text: 'todo1',
        checked: false,
    }]);

    const onAddTodo = (text: string) => {
        setTodos(prev => [
            ...prev,
            {
                id: prev.length + 1,
                text,
                checked: false,
            }
        ])
    };

    const onToggleTodo = (id: number) => {
        // checked 상태 토글 위해 선택한 투두 무엇인지 파악해야 함
        setTodos(prev => prev.map(todo => 
            todo.id === id ? {...todo, checked: !todo.checked} : todo
        ))
    }

    return (
        <>
        <TodoInput onAddTodo={onAddTodo} />
        <TodoList todos={todos} onToggleTodo={onToggleTodo} />
        </>
    )
}

export default TodoContainer;