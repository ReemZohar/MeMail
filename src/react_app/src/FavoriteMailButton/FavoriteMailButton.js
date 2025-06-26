import React from 'react';
import './FavoriteMailButton.css';

const FavoriteMailButton = ({ isFavorite, onClick }) => {
  return (
    <div className="tooltip-container">
      <button className="FavoriteMail-button" onClick={onClick}>
        {isFavorite ? (
          <i className="bi bi-star-fill favorite-icon"></i>
        ) : (
          <i className="bi bi-star favorite-icon"></i>
        )}
      </button>
      <span className="tooltip-text">Favorite</span>
    </div>
  );
};

export default FavoriteMailButton;