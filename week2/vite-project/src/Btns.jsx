import { useContext } from 'react';
import './App.css';
import { TodoContext } from '../context/ToDoContext';

const Btns = ({todo}) => {
    const {
        editId,
        editText,
        deleteTodo,
        isedit,
        editTodo
    } = useContext(TodoContext);
    return (
        <>
            {editId !== todo.id ?
              <button className='edit-btn' onClick={()=>isedit(todo.id, todo.task)}>수정하기</button>
              :
              <button className='edit-btn' onClick={()=>editTodo(todo.id, editText)}>수정완료</button>
            }
             <button className='delete-btn' onClick={()=>deleteTodo(todo.id)}>삭제하기</button>
        </>
    );
}

export default Btns;