import { useState } from 'react'
import './App.css'
import Input from './Input';
import Btns from './Btns';

const App = () => {
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
    <>
      <Input addTodoFunc={addTodo} />
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
              <Btns todo={todo} editId={editId} editText={editText} deleteTodo={deleteTodo}
              isedit={isedit} editTodo={editTodo} />
            </div>
          </div>
        })}
      </div>
    </>
  )
}

export default App;