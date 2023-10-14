/* eslint-disable react/prop-types */
import './watched-summary.css';

export default function WatchedSummary({
   numOfWatched,
   averageIMDBRate,
   averageRate,
   totalRuntime,
}) {
   return (
      <div className="summary">
         <h3 className="title">MOVIES YOU WATCHED</h3>
         <div className="details">
            <div className="movie-num">
               <span>#️⃣</span>
               <span>
                  {numOfWatched || 0} <br />
                  movies
               </span>
            </div>
            <p>⭐ {averageIMDBRate}</p>
            <p>🌟 {averageRate}</p>
            <div className="movie-num">
               <span>🤵🏽‍♂️</span>
               <span>
                  {totalRuntime || 0} <br />
                  min
               </span>
            </div>
         </div>
      </div>
   );
}
