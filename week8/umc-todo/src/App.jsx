import styled from "styled-components";
import CenterDiv from "./components/CenterDiv";
import NavBar from "./components/NavBar";
import { useEffect, useState } from "react";
import axios from 'axios';

const App = () => {
  const [title, setTitle] = useState('');
  const [todoInput, setTodoInput] = useState('');
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    const getAllTodos = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/todo');
        console.log('get todos: ', data);
        setTodo(data);
        console.log('todo', todo);
        return data;
      } catch (error) {
        console.error('error: ', error);
      }
    }
    getAllTodos();
  }, [])

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
        setTodo((prev) => [...prev, data]);
        console.log('add todo: ', todo);
      } catch (error) {
        console.error('post error: ', error);
      }
    };
    postTodo();
  }

  return (
    <>
    <CenterDiv>
      <NavBar />

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
        <TodoBtn onClick={onClickCreateTodo}>ToDo 생성</TodoBtn>
      </StyledForm>

      <div>
        <TodoBox>
          <input type="checkbox" />
          <TodoContents>
            <TodoTitle>제목</TodoTitle>
            <span>내용입니다!ㅎㅎ</span>
          </TodoContents>
          <ReviseBtn>수정</ReviseBtn>
          <ReviseBtn>삭제</ReviseBtn>
        </TodoBox>
      </div>
    </CenterDiv>
    </>
  );
}

export default App;

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