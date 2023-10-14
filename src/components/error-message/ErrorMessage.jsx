/* eslint-disable react/prop-types */
import './error-message.css';

export default function ErrorMessage({ errorMessage }) {
   return <p className="error-message">{errorMessage}</p>;
}
