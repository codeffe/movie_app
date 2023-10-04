import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import "./App.css";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const handleSearch = async (query) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/movies/search?query=${query}`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFavoriteToggle = async (movie) => {
    try {
      const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);

      if (isFavorite) {
        await axios.post("http://localhost:5000/api/movies/favorites", {
          action: "remove",
          movie: movie,
        });
      } else {
        await axios.post("http://localhost:5000/api/movies/favorites", {
          action: "add",
          movie: movie,
        });
      }

      const updatedFavorites = isFavorite
        ? favorites.filter((fav) => fav.imdbID !== movie.imdbID)
        : [...favorites, movie];
      setFavorites(updatedFavorites);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  useEffect(() => {
    const fetchInitialFavorites = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/movies");
        setFavorites(response.data);
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error fetching initial favorites:", error);
      }
    };

    fetchInitialFavorites();
  }, []);

  return (
    <div className="container">
      <h1>Movie Finder</h1>
      <SearchBar handleSearch={handleSearch} />
      <MovieList
        movies={searchResults}
        handleFavoriteToggle={handleFavoriteToggle}
        favorites={favorites}
      />
    </div>
  );
}

export default App;
