import client from "./client"

// POST TODO
const postTodo = async ({ title, content, checked=false}) => {
    const { data } = await client.post('/todo', {
        title,
        content,
        checked
    });

    return data;
};

// GET TODO (title)
const getAllTodo = async ({ title }) => {
    let url = '/todo';
    if (title) {
        url += `?title=${title}`
    };
    const { data } = await client.get(url);
    return data;
}

// GET TODO id
const getTodo = async ({ id }) => {
    const {data} = await client.get(`/todo/${id}`);
    return data;
}

// PATCH TODO
const patchTodo = async ({ id, title, content, checked }) => {
    const { data } = await client.patch(`/todo/${id}`, {
        title,
        content,
        checked
    });
    return data;
}

// DELETE TODO
const delTodo = async ({ id }) => {
    const { data } = await client.delete(`/todo/${id}`);
    return data;
}

export { postTodo, getAllTodo, getTodo, patchTodo, delTodo };