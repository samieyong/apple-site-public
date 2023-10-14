/* eslint-disable react/prop-types */
import { useState } from 'react';
import './aside.css';

export default function Aside({ box2, children }) {
   const [isOpen, setIsOpen] = useState(true);
   return (
      <aside className="box" ref={box2}>
         <button className="box-btn" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? '-' : '+'}
         </button>
         {isOpen && children}
      </aside>
   );
}
