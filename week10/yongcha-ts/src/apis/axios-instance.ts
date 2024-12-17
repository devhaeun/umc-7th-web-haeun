import axios, { AxiosInstance } from "axios";

const axiosInstance:AxiosInstance = axios.create({
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
    },
    baseURL: import.meta.env.VITE_MOVIE_API_URL,
})

export {axiosInstance}