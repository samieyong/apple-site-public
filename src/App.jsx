import { useEffect, useRef, useState } from 'react';
import './index.css';
import {
   NavBar,
   Aside,
   Movie,
   WatchedSummary,
   Watched,
   ActiveMovie,
   Loading,
   ErrorMessage,
} from './components';

const API_URL = 'https://www.omdbapi.com/?apikey=' + API_KEY;

function App() {
   ////////////////// States /////////////////
   const [searchInput, setSearchInput] = useState('');
   const [movies, setMovies] = useState([]);
   const [showActiveMovie, setShowActiveMovie] = useState(false);
   const [ratedMovies, setRatedMovies] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [errorMessage, setErrorMessage] = useState('');
   const [selectedID, setSelectedID] = useState('');
   const [rated, setRated] = useState('');

   const box2 = useRef(null);

   ////////////////// Derived States /////////////////
   const numOfWatched = ratedMovies.length;
   const averageIMDBRate = (
      ratedMovies?.reduce((acc, movie) => {
         return acc + movie.imdbRating;
      }, 0) / numOfWatched
   ).toFixed(1);
   const averageRate = (
      ratedMovies?.reduce((acc, movie) => {
         return acc + movie.myRating;
      }, 0) / numOfWatched
   ).toFixed(1);
   const totalRuntime = ratedMovies?.reduce((acc, movie) => {
      return acc + movie.Runtime;
   }, 0);

   ////////////////// Funtions /////////////////
   function handleOpenMovie(id) {
      // Scroll to ActiveMovie if view width <= 632px
      if (window.innerWidth <= 632) {
         window.scrollTo({
            top: box2.current.offsetTop,
            behavior: 'smooth',
         });
      }

      setRated(0);
      if (selectedID === id) {
         setShowActiveMovie(false);
         setSelectedID('');
         return;
      }
      ratedMovies?.map(
         (movie) => movie.imdbID === id && setRated(movie.myRating)
      );
      setSelectedID(id);
      setShowActiveMovie(true);
   }

   function handleCloseActiveMovie() {
      setShowActiveMovie(false);
      setSelectedID('');
   }

   function handleRateMovie(rate) {
      setRatedMovies((c) => [...c, rate]);
      setShowActiveMovie(false);
   }

   function handleDeleteRatedMovie(id) {
      setRatedMovies((movies) => movies.filter((movie) => movie.imdbID !== id));
   }

   useEffect(() => {
      async function getMovies(movieName) {
         setIsLoading(true);
         setErrorMessage('');
         try {
            const res = await fetch(`${API_URL}&s=${movieName}`);
            const apiData = await res.json();

            if (!res.ok) {
               throw new Error('Unable to fetch movies');
            }
            if (apiData.Response === 'False') {
               throw new Error('Unable to load Movies');
            }
            setMovies(apiData.Search);
         } catch (err) {
            setErrorMessage(err.message);
         } finally {
            setIsLoading(false);
         }
      }
      getMovies('batman');
   }, []);

   useEffect(() => {
      const controller = new AbortController();
      async function handleGetMovies() {
         setIsLoading(true);
         setErrorMessage('');
         try {
            const res = await fetch(`${API_URL}&s=${searchInput}`, {
               signal: controller.signal,
            });
            const apiData = await res.json();

            if (!res.ok) {
               throw new Error('Unable to fetch movies');
            }
            if (apiData.Response === 'False') {
               throw new Error('No movies found for "' + searchInput + '"');
            }
            setMovies(apiData.Search);
         } catch (err) {
            if (err.name !== 'AbortError') {
               setErrorMessage(err.message);
            }
         } finally {
            setIsLoading(false);
         }
      }
      if (searchInput.length < 3) {
         setMovies([]);
         setErrorMessage('');
         return;
      }
      handleGetMovies();
      return function () {
         controller.abort();
      };
   }, [searchInput]);

   ///////////// Return //////////////
   return (
      <main>
         <div className="container">
            <NavBar
               searchInput={searchInput}
               setSearchInput={setSearchInput}
               numOfMovies={movies.length}
            />
            <div className="box-wrapper">
               <Aside>
                  {isLoading && <Loading />}

                  {!isLoading &&
                     !errorMessage &&
                     movies.map((movie) => (
                        <Movie
                           key={movie.imdbID}
                           movie={movie}
                           openMovie={handleOpenMovie}
                        />
                     ))}
                  {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
               </Aside>
               <Aside box2={box2}>
                  {showActiveMovie ? (
                     <ActiveMovie
                        key={selectedID}
                        setShowActiveMovie={setShowActiveMovie}
                        onRateMovie={handleRateMovie}
                        selectedID={selectedID}
                        rated={rated}
                        closeActiveMovie={handleCloseActiveMovie}
                     />
                  ) : (
                     <>
                        <WatchedSummary
                           numOfWatched={numOfWatched}
                           averageIMDBRate={
                              averageIMDBRate > 1 ? averageIMDBRate : 0
                           }
                           averageRate={averageRate > 1 ? averageRate : 0}
                           totalRuntime={totalRuntime}
                        />
                        {ratedMovies?.map((movie) => (
                           <Watched
                              key={movie.imdbID}
                              movie={movie}
                              onDeleteRated={handleDeleteRatedMovie}
                              openActiveMovie={handleOpenMovie}
                           />
                        ))}
                     </>
                  )}
               </Aside>
            </div>
         </div>
      </main>
   );
}

export default App;
