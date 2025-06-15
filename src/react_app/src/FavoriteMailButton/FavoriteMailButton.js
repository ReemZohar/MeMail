import React from 'react';
import { MdStar, MdStarBorder } from 'react-icons/md';
import './FavoriteMailButton.css';

const FavoriteMailButton = ({ isFavorite, onClick }) => {
  return (
    <button className="FavoriteMail-button" onClick={onClick}>
      {isFavorite ? <MdStar size={24} color="gold" /> : <MdStarBorder size={24} />}
    </button>
  );
};

export default FavoriteMailButton;
