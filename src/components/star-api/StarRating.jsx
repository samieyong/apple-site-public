/* eslint-disable react/prop-types */
import { useState } from 'react';
import './star-rating.css';

export default function StarRating({
   color = '#f8d402',
   rateLength = 10,
   size = 50,
   message = [],
   onRated,
}) {
   const [rating, setRating] = useState(0);
   const [tempRating, setTempRating] = useState(0);

   const starRatingParaStyle = {
      color: color,
      fontSize: size / 1.5,
   };

   function handleClick(rate) {
      setRating(rate);
      onRated(rate);
   }

   return (
      <div className="star-rating">
         <div className="star-wrapper">
            {Array.from({ length: rateLength }, (_, i) => (
               <Star
                  key={i}
                  i={i + 1}
                  size={size}
                  color={color}
                  handleClick={() => handleClick(i + 1)}
                  setTempRating={setTempRating}
                  full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
               />
            ))}
         </div>
         <p style={starRatingParaStyle}>
            {message.length === rateLength
               ? message[tempRating ? tempRating - 1 : rating - 1]
               : tempRating || rating || ''}
         </p>
      </div>
   );
}

function Star({ i, handleClick, setTempRating, full, size, color }) {
   const starStyle = {
      width: size,
      height: size,
      cursor: 'pointer',
   };
   return (
      <span
         style={starStyle}
         onClick={handleClick}
         onMouseEnter={() => setTempRating(i)}
         onMouseLeave={() => setTempRating(0)}
      >
         {full ? (
            <svg
               id="eoLMklcxRvw1"
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 300 300"
               shapeRendering="geometricPrecision"
               textRendering="geometricPrecision"
            >
               <polygon
                  points="0,-78.689205 23.126177,-31.830452 74.837882,-24.316302 37.418941,12.158151 46.252354,63.660904 0,39.344603 -46.252354,63.660904 -37.418941,12.158151 -74.837882,-24.316302 -23.126177,-31.830452 0,-78.689205"
                  transform="matrix(1.812538 0 0 1.807474 150 163.581633)"
                  fill={color}
                  stroke={color}
                  strokeWidth="5"
               />
            </svg>
         ) : (
            <svg
               id="e7pM3fsE6mU1"
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 300 300"
               shapeRendering="geometricPrecision"
               textRendering="geometricPrecision"
            >
               <polygon
                  points="0,-78.689205 23.126177,-31.830452 74.837882,-24.316302 37.418941,12.158151 46.252354,63.660904 0,39.344603 -46.252354,63.660904 -37.418941,12.158151 -74.837882,-24.316302 -23.126177,-31.830452 0,-78.689205"
                  transform="matrix(1.812538 0 0 1.807474 150 163.581633)"
                  fill="rgba(223,250,5,0.01)"
                  stroke={color}
                  strokeWidth="5"
               />
            </svg>
         )}
      </span>
   );
}
