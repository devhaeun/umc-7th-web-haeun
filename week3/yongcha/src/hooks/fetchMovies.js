import { axiosInstance } from "../apis/axios-instance";

const fetchMovies = async ({category, pageParam}) => {
    const {data} = await axiosInstance.get(`/movie/${category}?language=ko&page=${pageParam}`);
    console.log(data);
    return data;
}

export {fetchMovies};