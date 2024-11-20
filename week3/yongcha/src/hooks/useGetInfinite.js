import { useInfiniteQuery } from "@tanstack/react-query"
import { fetchMovies } from "./fetchMovies"

const useGetInfinite = ({category}) => {
    console.log(category);
    return useInfiniteQuery({
        queryFn: ({pageParam}) => fetchMovies({category, pageParam}),
        queryKey: ['movies', category],
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            const lastMovie = lastPage.results.at(-1);
            return lastMovie ? allPages?.length + 1 : undefined;
        }
    })
}

export default useGetInfinite