import { useEffect, useState } from "react";
import useCustomFetch from "../hooks/useCustomFetch";
import SyncLoader from "react-spinners/SyncLoader";
import styled from "styled-components";
import TodoBox from "./TodoBox";
import TodoTitle from "./TodoTitle";
import TodoContents from "./TodoContents";
import { useQuery } from "@tanstack/react-query";
import { getAllTodo } from "../apis/todoFunc";

const SearchTodos = () => {
    const [searchValue, setSearchValue] = useState('');
    const [debounce, setDebounce] = useState('');
    const {data, isLoading, isError} = useQuery({
        queryKey: ["todos", debounce],
        queryFn: () => getAllTodo({title:debounce}),
    })

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            setDebounce(searchValue);
        }, 500);
        return () => {
            clearTimeout(debounceTimer);
        }
    }, [searchValue]);

    if (isLoading) {
        return (
            <>
            <TodoInput
            type="text"
            value={searchValue}
            onChange={(e)=>setSearchValue(e.target.value)}
            placeholder="검색어를 입력해주세요"
            />
            <SyncLoader color="gold" />
            </>
        );
    }
    if (isError) {
        return (
            <>
            <TodoInput
            type="text"
            value={searchValue}
            onChange={(e)=>setSearchValue(e.target.value)}
            placeholder="검색어를 입력해주세요"
            />
            <div>에러가 발생했습니다.</div>
            </>
        )
    }

    return (
        <div>
            <TodoInput
            type="text"
            value={searchValue}
            onChange={(e)=>setSearchValue(e.target.value)}
            placeholder="검색어를 입력해주세요"
            autoFocus
            />
            {
            data[0]?.map(todo => (
                <TodoBox key={todo.id}>
                    <TodoContents>
                        <TodoTitle>{todo.title}</TodoTitle>
                        <span>{todo.content}</span>
                    </TodoContents>
                </TodoBox>
            ))
            }
        </div>
    );
};

export default SearchTodos;

const TodoInput = styled.input`
  width: 500px;
  height: 40px;
  box-sizing: border-box;
  margin-top: 5em;
  margin-bottom: 3em;
  padding: 0.4em;
`