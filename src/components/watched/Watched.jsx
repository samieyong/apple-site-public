/* eslint-disable react/prop-types */
import './watched.css';

export default function Watched({ movie, onDeleteRated, openActiveMovie }) {
   return (
      <div
         className="movie-wrapper"
         onClick={() => openActiveMovie(movie.imdbID)}
      >
         <img src={movie.Poster} alt={movie.Title} />
         <div className="movie-summary">
            <p className="title">{movie.Title}</p>
            <div className="details">
               <p>⭐ {movie.imdbRating}</p>
               <p>🌟 {movie.myRating}</p>
               <p>🤵🏽‍♂️ {movie.Runtime} min</p>
               <button
                  className="watched-btn"
                  onClick={() => onDeleteRated(movie.imdbID)}
               >
                  x
               </button>
            </div>
         </div>
      </div>
   );
}
