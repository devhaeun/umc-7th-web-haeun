import { useState } from 'react'
import './Poster.css'
import { MOVIES } from './mocks/movies';

const Poster = (props) => {
    const [isHovering, setIsHovering] = useState(false);
    const handleMouseOver = () => {
        setIsHovering(true);
    }
    const handleMouseOut = () => {
        setIsHovering(false);
    }

    const {val} = props;
    const posterPath = 'https://image.tmdb.org/t/p/w500' + MOVIES.results[val].poster_path;
    
    const imgStyle = {
        width: '120px',
        borderRadius:'0.5em',
    }

    return (
    <>
        <div>
            <img className={isHovering ? 'dark' : ''}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut} 
            style={imgStyle} src={posterPath} alt="" />
        </div>
    </>
  )
}

export default Poster;