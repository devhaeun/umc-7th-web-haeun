import { axiosInstance } from "../apis/axios-instance";

interface FetchParams {
    category: string;
    pageParam: string;
};

interface MovieData {
    adult: boolean;
    backdrop_path:string;
    genre_ids:number[];
    id: number;
    original_language:string,
    original_title:string,
    overview:string,
    popularity:number,
    poster_path:string,
    release_date:string,
    title:string,
    video:boolean,
    vote_average:number,
    vote_count:number
};

export interface MovieResponse {
    dates: {
        maximum:string,
        minimum:string,
    },
    page:number,
    results:MovieData[],
    total_pages:number,
    total_results:number
};

const fetchMovies = async ({category, pageParam}:FetchParams):Promise<MovieResponse> => {
    const {data} = await axiosInstance.get(`/movie/${category}?language=ko&page=${pageParam}`);
    // console.log(data);
    return data;
}

export {fetchMovies};