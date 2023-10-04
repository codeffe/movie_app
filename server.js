const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

const favorites = [];

app.get("/api/movies/search", async (req, res) => {
  const { query } = req.query;

  try {
    // Make a request to the OMDB API
    const response = await axios.get(
      `http://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=f7ffeb73`
    );
    res.status(200).json(response.data.Search);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching movie data." });
  }
});

app.post("/api/movies/favorites", (req, res) => {
  const { action, movie } = req.body;

  if (action === "add") {
    favorites.push(movie);
    res.status(201).json({ message: "Movie added to favorites", favorites });
  } else if (action === "remove") {
    const index = favorites.findIndex((fav) => fav.imdbID === movie.imdbID);
    if (index !== -1) {
      favorites.splice(index, 1);
      res
        .status(200)
        .json({ message: "Movie removed from favorites", favorites });
    } else {
      res.status(404).json({ error: "Movie not found in favorites" });
    }
  } else {
    res.status(400).json({ error: "Invalid action" });
  }

  console.log("Updated favorites:", favorites);
});

app.get("/api/movies", (req, res) => {
  res.status(200).json(favorites);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
