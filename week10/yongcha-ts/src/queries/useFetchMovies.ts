import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { fetchMovies, MovieResponse } from "./fetchMovies";

const useFetchMovies = (category:string, pageParam:string):UseQueryResult<MovieResponse, Error> => {
    const { data, isLoading, isError } = useQuery<MovieResponse, Error>({
        queryKey: ['movies', category],
        queryFn: () => fetchMovies({ category: category, pageParam: pageParam}),
    });

    // return { data, isLoading, isError };
};

export { useFetchMovies };