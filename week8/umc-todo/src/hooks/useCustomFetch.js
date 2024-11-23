import axios from "axios";
import { useEffect, useState } from "react";

const useCustomFetch = (id='') => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const todoId = id;

    const fetchTodos = async (customId = todoId) => {
        setIsLoading(true);
        try {
            const { data: response } = await axios.get(`http://localhost:3000/todo${customId}`);
            setData(response);
            console.log('response: ',response);
        } catch (error) {
            setIsError(true);
            console.error('error: ', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTodos(id);
    }, [id]);

    return {data, isLoading, isError, refetch: fetchTodos};
}

export default useCustomFetch;