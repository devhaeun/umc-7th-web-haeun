import { useContext } from 'react'
import './App.css'
import Input from './Input';
import Btns from './Btns';
import { TodoContext } from '../context/ToDoContext';

const App = () => {
  const {
    todos,
    editId,
    editText,
    setEditText,
    deleteTodo,
    isedit,
    editTodo
  } = useContext(TodoContext);
  return (
    <>
      <Input />
      <div className='todo-list-box'>
        {todos.map((todo, i) => {
          return <div key={todo.id} className='todo-list-content'>
            {editId !== todo.id && (
              <div>
                <span>{i+1}번&nbsp;</span>
                <span>{todo.task}&nbsp;</span>
                <span>id: {todo.id}</span>
              </div>
            )}
            {editId === todo.id && (
              <div>
                <span>{i+1}번&nbsp;</span>
                <input defaultValue={todo.task} onChange={(e) => {setEditText(e.target.value)}}/>
                <span>id: {todo.id}</span>
              </div>
            )}
            <div>
              <Btns todo={todo} />
            </div>
          </div>
        })}
      </div>
    </>
  )
}

export default App;