import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import useCustomFetch from "../hooks/useCustomFetch";

const TodoDetail = () => {
    const params = useParams();
    const [todo, setTodo] = useState([]);
    const { data: todoData, isLoading, isError, refetch } = useCustomFetch(`/${params.todoId}`);
    const navigate = useNavigate();
    const [isEdit, setIsEdit] = useState(false);
    const [editTitle, setEditTitle] = useState('');
    const [editText, setEditText] = useState('');

    useEffect(() => {
        setTodo(todoData);
        console.log('Detail First Call: ', todoData, isLoading, isError);
    }, [todoData, isLoading, isError]);

    // console.log('params: ',params.todoId);
    console.log('todo: ', todo);

    const onDelete = (id) => {
        const deleteTodo = async (id) => {
        try {
            const { data } = await axios.delete(`http://localhost:3000/todo/${id}`);
            console.log('delete data: ', data);
        } catch (error) {
            console.error('delete error: ', error);
        } finally {
            navigate(-1);
        }
        }
        deleteTodo(id);
    };

    const onClickRevise = (title, text) => {
        setIsEdit(true);
        setEditTitle(title);
        setEditText(text);
    };

    const onRevise = (id) => {
        const ReviseTodo = async (id) => {
            try {
              const { data } = await axios.patch(`http://localhost:3000/todo/${id}`, {
                title: editTitle,
                content: editText,
              });
              console.log('patch data: ', data);
              setEditTitle('');
              setEditText('');
              setIsEdit(false);
              refetch();
            } catch (error) {
              console.error('patch error: ', error);
            }
        }
        ReviseTodo(id);
    }

    const onCheckbox = () => {
        const ToggleCheck = async (bool) => {
            try {
                await axios.patch(`http://localhost:3000/todo/${todo.id}`, {
                    checked: bool
                });
                // getAllTodos(setTodo);
                refetch();
            } catch (error) {
                console.error('patch check error: ', error);
            }
        }
        ToggleCheck(!todo.checked);
    }

    if (isEdit) {
        return (
            <div>
                <input
                type="text"
                defaultValue={editTitle}
                onChange={(e)=>setEditTitle(e.target.value)}
                />
                <input
                type="text"
                defaultValue={editText}
                onChange={(e)=>setEditText(e.target.value)}
                />
                <div>
                    <button onClick={()=>onRevise(todo.id)}>완료</button>
                    <button disabled>삭제</button>
                </div>
            </div>
        )
    }
    return (
        <div>
            <h2>
                {todo.checked && (
                    <input type="checkbox" onChange={onCheckbox} checked />
                )}
                {!todo.checked && (
                    <input type="checkbox" onChange={onCheckbox} />
                )}
                <span>{todo.title}</span>
            </h2>
            <div>작성일: {todo.createdAt}</div>
            <div>마지막 수정일: {todo.updatedAt}</div>
            <div>상태: {todo.checked ? '완료' : '미완' }</div>
            <div>
                {todo.content}
            </div>
            <div>
                <button
                onClick={()=>onClickRevise(todo.title, todo.content)}>
                    수정
                </button>
                <button onClick={()=>onDelete(todo.id)}>삭제</button>
            </div>
        </div>
    );
}

export default TodoDetail;