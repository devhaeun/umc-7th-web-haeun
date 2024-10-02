import { useState } from "react";
import './App.css';

const Input = ({addTodoFunc}) => {
    const [formText, setFormText] = useState('');
    const onSubmit = (e) => {
        e.preventDefault();
    };
    const onChange = (e) => {
        setFormText(e.target.value);
    };
    return (
        <>
        <form className="form-box" onSubmit={onSubmit} >
            <input className="input-box" type="text" value={formText} onChange={onChange} />
            <button className="add-button"
            onClick={()=>{
                addTodoFunc(formText)
                setFormText('')
                }}>할 일 등록</button>
        </form>
        </>
    );
}

export default Input;