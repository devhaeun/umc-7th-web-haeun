import MovieCard from "../../components/MovieCard";
import axios from 'axios';
import API_KEY from '../../apikey';
import { useState, useEffect } from 'react';
import CardContainer from '../../components/CardContainer';

const NowPlaying = () => {
    const [movies, setMovies] = useState([]);
    
    useEffect(() => {
        const getMovies = async () => {
            const movies = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?language=ko&page=1`, {
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                }
            });
            setMovies(movies);
        }
        getMovies();
    }, []);

    return (
        <>
            <CardContainer>
                {movies.data?.results.map((movie) => (
                    <MovieCard key={movie.id}
                    posterPath={movie.poster_path}
                    title={movie.title}
                    releaseDate={movie.release_date}
                    />
                ))}
            </CardContainer>
        </>
    );
};

export default NowPlaying;