import styled from "styled-components";
import CenterDiv from "../components/CenterDiv";
import { useEffect, useState } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import { useNavigate } from "react-router-dom";
import TodoBox from "./TodoBox";
import TodoTitle from "./TodoTitle";
import TodoContents from "./TodoContents";
import { useMutation, useQuery } from '@tanstack/react-query';
import { delTodo, getAllTodo, patchTodo, postTodo } from "../apis/todoFunc";
import { queryClient } from "../main";

const AllTodos = () => {
  const [title, setTitle] = useState('');
  const [todoInput, setTodoInput] = useState('');
  const [editId, setEditId] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editText, setEditText] = useState('');
  const { data:todo, isLoading, isError } = useQuery({
    queryKey: ['todos'],
    queryFn: getAllTodo,
    staleTime: 500,
  })

  const { mutate:postTodoMutation } = useMutation({
    mutationFn: postTodo,
    onSuccess: (data) => {
      console.log('post:',data);
      queryClient.invalidateQueries({
        queryKey: ['todos'],
      });
    },
    onError: (error) => console.error('post error: ', error)
  });

  const { mutate:delTodoMutation } = useMutation({
    mutationFn: delTodo,
    onSuccess: (data) => {
      console.log('del:', data);
      queryClient.invalidateQueries({
        queryKey: ['todos'],
      });
    },
    onError: (error) => console.error('del error: ', error)
  });

  const { mutate:patchTodoMutation } = useMutation({
    mutationFn: patchTodo,
    onSuccess: (data) => {
      console.log('patch:', data);
      queryClient.invalidateQueries({
        queryKey: ['todos'],
      });
    },
    onError: (error) => console.error('patch error: ', error)
  });

  const navigate = useNavigate();

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
    postTodoMutation({title, content:todoInput});
    setTitle('');
    setTodoInput('');
  };

  const onDelete = (id) => {
    delTodoMutation({id: id});
  }

  const onClickRevise = (id, title, text) => {
    setEditId(id);
    setEditTitle(title);
    setEditText(text);
  }

  const onRevise = (id) => {
    patchTodoMutation({id:id, title:editTitle, content:editText});
    setEditId('');
    setEditTitle('');
    setEditText('');
  };

  const onCheckbox = (id, checked) => {
    patchTodoMutation({id:id, checked:!checked});
  }

  return (
    <>
    <CenterDiv>
      <button
      onClick={() => {
        navigate('/search', {
          state: {todo: todo[0]},
        })
      }}
      >
        검색
      </button>
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
        {(isLoading || todo===undefined)? <SyncLoader color="gold" /> :
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