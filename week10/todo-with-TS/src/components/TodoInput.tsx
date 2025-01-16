import { ChangeEvent, useState } from "react";

interface ITodoInput {
    onAddTodo: (text: string) => void;
}

const TodoInput = ({onAddTodo}:ITodoInput) => {
    const [input, setInput] = useState('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    }

    const addTodo = () => {
        onAddTodo(input);
        setInput('');
    }

    return (
        <>
        <input value={input} onChange={handleInputChange} />
        <button onClick={addTodo}>입력</button>
        </>
    )
}

export default TodoInput;