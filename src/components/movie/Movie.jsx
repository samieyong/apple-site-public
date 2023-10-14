/* eslint-disable react/prop-types */
import './movie.css';

export default function Movie({ movie, openMovie }) {
   return (
      <div className="movie-wrapper" onClick={() => openMovie(movie.imdbID)}>
         <img src={movie.Poster} alt={movie.Title} />
         <div className="movie-summary">
            <p className="title">{movie.Title}</p>
            <p className="date">🗓️ {movie.Year}</p>
         </div>
      </div>
   );
}
