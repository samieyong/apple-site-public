/* eslint-disable react/prop-types */
import './navbar.css';

export default function NavBar({ numOfMovies, searchInput, setSearchInput }) {
   return (
      <nav>
         <div className="container">
            <div className="nav-logo-wrapper">
               <span>🍿</span>
               <span className="logo">usePopcorn</span>
            </div>
            <input
               type="text"
               placeholder="Enter movie name"
               className="search-bar"
               value={searchInput}
               onChange={(e) => setSearchInput(e.target.value)}
            />
            <div className="nav-summary-wrapper">
               {numOfMovies < 1 ? (
                  <p>No movies yet</p>
               ) : (
                  <p>
                     Found <strong>{numOfMovies}</strong> results
                  </p>
               )}
            </div>
         </div>
      </nav>
   );
}
