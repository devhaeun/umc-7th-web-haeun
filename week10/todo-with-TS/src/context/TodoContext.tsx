import { createContext, PropsWithChildren, useContext, useState } from "react";
import { TTodo } from "../types/todo";

interface ITodoContext {
    todos: TTodo[];
    onAddTodo: (text:string) => void;
    onToggleTodo: (id:number) => void;
}

const TodoContext = createContext<ITodoContext|null>(null);

export const TodoProvider = ({children}:PropsWithChildren) => {
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
        <TodoContext.Provider value={{todos, onAddTodo, onToggleTodo}}>
            {children}
        </TodoContext.Provider>
    )
};

export const useTodoContext = () => {
    const todos = useContext(TodoContext);

    if (todos===null) {
        throw new Error('TodoProvider를 찾을 수 없습니다.')
    }
    
    return todos;
}