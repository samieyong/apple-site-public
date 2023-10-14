/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import './active-movie.css';
import StarRating from '../star-api/StarRating';
import Loading from '../loading/Loading';
import ErrorMessage from '../error-message/ErrorMessage';

const API_URL = 'https://www.omdbapi.com/?apikey=' + API_KEY;

export default function ActiveMovie({
   rated,
   setShowActiveMovie,
   onRateMovie,
   selectedID,
   closeActiveMovie,
}) {
   const [rating, setRating] = useState('');
   const [isLoading, setIsLoading] = useState(false);
   const [activeMovie, setActiveMovie] = useState('');
   const [errorMessage, setErrorMessage] = useState('');

   function rateMovie() {
      const newMovie = {
         imdbID: activeMovie.imdbID,
         Poster: activeMovie.Poster,
         imdbRating: Number(activeMovie.imdbRating),
         myRating: rating,
         Runtime: Number(activeMovie.Runtime.split(' ')[0]),
      };
      onRateMovie(newMovie);
   }

   // useEffect to load movie with selectedID to ActiveMovie
   useEffect(() => {
      async function openActiveMovie() {
         setIsLoading(true);
         try {
            const res = await fetch(`${API_URL}&i=${selectedID}`);
            const apiData = await res.json();

            if (!res.ok) {
               throw new Error();
            }
            if (apiData.Response === 'False') {
               throw new Error();
            }
            setActiveMovie(apiData);
         } catch (err) {
            setErrorMessage('Unable to load movie');
            console.log(err.message);
         } finally {
            setIsLoading(false);
         }
      }
      openActiveMovie();
   }, [selectedID, setErrorMessage]);

   // useEffect to add movie title to document title
   useEffect(() => {
      if (!activeMovie.Title) return;
      document.title = 'Movie | ' + activeMovie.Title;
      return function () {
         document.title = 'usePopcorn';
      };
   }, [activeMovie.Title]);

   // useEffect to close ActiveMovie when esc key is pressed
   useEffect(() => {
      function callback(e) {
         if (e.code === 'Escape') {
            closeActiveMovie();
         }
      }
      document.addEventListener('keydown', callback);

      return function () {
         document.removeEventListener('keydown', callback);
      };
   }, [setShowActiveMovie, closeActiveMovie]);

   return (
      <div className="active-movie">
         {isLoading && <Loading />}
         {!isLoading && !errorMessage && (
            <>
               <div className="active-movie-details-wrapper">
                  <img src={activeMovie.Poster} alt={activeMovie.Title} />
                  <div className="active-movie-details">
                     <h3>{activeMovie.Title}</h3>
                     <p>
                        <span>{activeMovie.Released}</span> -{' '}
                        <span>{activeMovie.Runtime}</span>
                     </p>
                     <p>{activeMovie.Genre}</p>
                     <p>⭐ {activeMovie.imdbRating} IMDb rating</p>
                  </div>
               </div>
               <div className="active-movie-summary">
                  <div className="star-rating-wrapper">
                     {rated ? (
                        <p>You Rated this movie ⭐{rated}</p>
                     ) : (
                        <>
                           <StarRating size={20} onRated={setRating} />
                           {rating && (
                              <button
                                 className="star-rating-btn"
                                 onClick={() => rateMovie()}
                              >
                                 + Add to list
                              </button>
                           )}
                        </>
                     )}
                  </div>
                  <p>{activeMovie.Plot}</p>
                  <p>Starring {activeMovie.Actors}</p>
                  <p>Directed by {activeMovie.Director}</p>
               </div>
               <button className="back-btn" onClick={closeActiveMovie}>
                  ⬅
               </button>
            </>
         )}
         {!isLoading && errorMessage && (
            <ErrorMessage errorMessage={errorMessage} />
         )}
      </div>
   );
}
