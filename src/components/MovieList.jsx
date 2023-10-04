import React from "react";
import HeartIcon from "./HeartIcon";
import "./MovieList.css";

const MovieList = ({ movies, handleFavoriteToggle, favorites }) => {
  if (!Array.isArray(movies)) {
    return null;
  }

  return (
    <div className="movie-list">
      {movies.map((movie, index) => (
        <div key={index} className="movie-card">
          <img
            src={movie.Poster}
            alt={`${movie.Title} Poster`}
            className="movie-poster"
          />
          <div className="movie-details">
            <div className="movie-header">
              <h3 className="movie-title">{movie.Title}</h3>
              <p className="movie-year">Year: {movie.Year}</p>
            </div>
            <HeartIcon
              fill={
                favorites?.some((fav) => fav.imdbID === movie.imdbID)
                  ? "red"
                  : "none"
              }
              onClick={() => handleFavoriteToggle(movie)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
