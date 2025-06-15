import React from 'react';
import { MdStar, MdStarBorder } from 'react-icons/md';
import './FavoriteMailButton.css';

const FavoriteMailButton = ({ isFavorite, onClick }) => {
  return (
    <div className="tooltip-container">
      <button className="FavoriteMail-button" onClick={onClick}>
        {isFavorite ? <MdStar size={24} color="gold" /> : <MdStarBorder size={24} />}
      </button>
      <span className="tooltip-text">Favorite</span>
    </div>
  );
};

export default FavoriteMailButton;