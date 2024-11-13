import { createContext, useState } from "react";

export const TodoContext = createContext();

const TodoContextProvider = ({children}) => {
    const [todos, setTodos] = useState([
        {id: 1, task: '리액트 공부하기'},
    ]);
    const [editId, setEditId] = useState('');
    const [editText, setEditText] = useState('');

    const addTodo = (text) => {
    if (text === '') return;
    // 할 일 등록
    setTodos((prevState) => [
        ...prevState,
        { id: Math.floor(Math.random()*100)+2, task: text },
    ]);
    };
    const deleteTodo = (id) => {
    setTodos((prev) => {
        return prev.filter((todo) => todo.id !== id);
    });
    };
    const isedit = (id, task) => {
    setEditId(id);
    setEditText(task);
    }
    const editTodo = (id, text) => {
        setTodos((prev) => {
        return prev.map((item) => (item.id === id ? {...item, task: text} : item));
        });
        setEditId('');
        setEditText('');
    }
    return (
        <TodoContext.Provider value={{
            todos,
            setTodos,
            editId,
            setEditId,
            editText,
            setEditText,
            addTodo,
            deleteTodo,
            isedit,
            editTodo
        }}>
            {children}
        </TodoContext.Provider>
    )
}

export default TodoContextProvider;