import styled from "styled-components";
import CenterDiv from "../components/CenterDiv";
import { useEffect, useState } from "react";
import axios from 'axios';
// import getAllTodos from "../hooks/getAllTodos";
import useCustomFetch from "../hooks/useCustomFetch";
import SyncLoader from "react-spinners/SyncLoader";
import { useNavigate } from "react-router-dom";

const AllTodos = () => {
  const [title, setTitle] = useState('');
  const [todoInput, setTodoInput] = useState('');
  const [todo, setTodo] = useState([]);
  const [editId, setEditId] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editText, setEditText] = useState('');
  const { data: todoData, isLoading, isError, refetch } = useCustomFetch();
  const navigate = useNavigate();

  useEffect(() => {
    setTodo(todoData);
    console.log('first call: ', todoData, isLoading, isError);
  }, [todoData, isLoading, isError]);

  useEffect(() => console.log('???', todo), [todo]);

  const onSubmit = (e) => {
    e.preventDefault();
  }

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  }
  const onChangeTodoInput = (e) => {
    setTodoInput(e.target.value);
  }
  
  const onClickCreateTodo = () => {
    const postTodo = async () => {
      try {
        const { data } = await axios.post('http://localhost:3000/todo', {
          title: title,
          content: todoInput,
        });
        console.log('post data: ', data);
        // getAllTodos(setTodo);
        refetch();
        setTitle('');
        setTodoInput('');
        // console.log('add todo: ', todo);
      } catch (error) {
        console.error('post error: ', error);
      }
    };
    postTodo();
  };

  const onDelete = (id) => {
    const deleteTodo = async (id) => {
      try {
        const { data } = await axios.delete(`http://localhost:3000/todo/${id}`);
        console.log('delete data: ', data);
        // getAllTodos(setTodo);
        refetch();
      } catch (error) {
        console.error('delete error: ', error);
      }
    }
    deleteTodo(id);
  }

  const onClickRevise = (id, title, text) => {
    setEditId(id);
    setEditTitle(title);
    setEditText(text);
  }

  const onRevise = (id) => {
    const ReviseTodo = async (id) => {
      try {
        const { data } = await axios.patch(`http://localhost:3000/todo/${id}`, {
          title: editTitle,
          content: editText,
        });
        console.log('patch data: ', data);
        setEditId('');
        setEditTitle('');
        setEditText('');
        // getAllTodos(setTodo);
        refetch();
      } catch (error) {
        console.error('patch error: ', error);
      }
    }
    ReviseTodo(id);
  };

  const onCheckbox = (id, checked) => {
    const ToggleCheck = async (id, bool) => {
        try {
            await axios.patch(`http://localhost:3000/todo/${id}`, {
                checked: bool
            });
            // getAllTodos(setTodo);
            refetch();
        } catch (error) {
            console.error('patch check error: ', error);
        }
    }
    checked ? ToggleCheck(id, false) : ToggleCheck(id, true);
  }

  return (
    <>
    <CenterDiv>
      <StyledForm onSubmit={onSubmit}>
        <TodoInput
        type="text"
        placeholder="제목을 입력해주세요"
        value={title}
        onChange={onChangeTitle}
        />
        <TodoInput
        type="text"
        placeholder="내용을 입력해주세요"
        value={todoInput}
        onChange={onChangeTodoInput}
        />
        {(title==='' || todoInput==='')&&<TodoBtn disabled>ToDo 생성</TodoBtn>}
        {title!==''&&todoInput!==''&&<TodoBtn onClick={onClickCreateTodo}>ToDo 생성</TodoBtn>}
      </StyledForm>

      <div>
        {isLoading ? <SyncLoader color="gold" /> :
        isError ? <div>에러가 발생했습니다.</div> :
          todo[0]?.map(todo => {
            console.log('리렌더링');
            return <TodoBox key={todo.id}>
                {todo.checked && (
                    <input type="checkbox" onChange={()=>onCheckbox(todo.id, todo.checked)} checked />
                )}
                {!todo.checked && (
                    <input type="checkbox" onChange={()=>onCheckbox(todo.id, todo.checked)} />
                )}
                {editId !== todo.id && (
                    <>
                    <TodoContents
                    onClick={() => {
                        navigate(`/${todo.id}`, {
                            state: {todo: todo},
                        })
                    }}
                    >
                        <TodoTitle>{todo.title}</TodoTitle>
                        <span>{todo.content}</span>
                    </TodoContents>
                    <ReviseBtn onClick={()=>onClickRevise(todo.id, todo.title, todo.content)}>수정</ReviseBtn>
                    <ReviseBtn onClick={()=>onDelete(todo.id)}>삭제</ReviseBtn>
                    </>
                )}
                {editId === todo.id && (
                    <>
                    <TodoContents>
                        <input
                        type="text"
                        defaultValue={editTitle}
                        onChange={(e) => {setEditTitle(e.target.value)}}
                        />
                        <input
                        type="text"
                        defaultValue={editText}
                        onChange={(e) => {setEditText(e.target.value)}}
                        />
                    </TodoContents>
                    <ReviseBtn onClick={()=>onRevise(todo.id)}>완료</ReviseBtn>
                    <ReviseBtn onClick={()=>onDelete(todo.id)} disabled>삭제</ReviseBtn>
                    </>
                )}
            </TodoBox>
        })}
      </div>
    </CenterDiv>
    </>
  );
}

export default AllTodos;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 4em 0 3em 0;
`

const TodoInput = styled.input`
  width: 500px;
  height: 40px;
  box-sizing: border-box;
  margin-bottom: 2px;
  padding: 0.4em;
`
const TodoBtn = styled.button`
  width: 500px;
  height: 35px;
`

const TodoBox = styled.div`
  box-sizing: border-box;
  width: 500px;
  display: flex;
  border: 1px solid grey;
  border-radius: 0.8em;
  padding: 0.7em 0.7em;
  margin-bottom: 1em;
  align-items: center;
`
const ReviseBtn = styled.button`
  width: 5.5em;
  height: 2.5em;
  border: none;
  border-radius: 0.2em;
  margin: 0.3em;
  &:hover {
    cursor: pointer;
    background-color: lightgrey;
  }
  &:disabled {
    cursor: default;
    background-color: buttonface;
  }
`
const TodoTitle = styled.h5`
  margin: 0;
  margin-bottom: 5px;
  font-size: 1em;
`
const TodoContents = styled.div`
  flex: 1;
  padding: 0 0.5em;
`