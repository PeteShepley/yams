const express = require('express');
const cors = require('cors');

const { MovieData } = require('./movie-data');

const app = express();
const movieData = new MovieData();

app.use(cors());
app.use(express.json());

app.get('/status', async (req, res) => {
  return res.json({status: 'OK'});
});

app.get('/popular', async (req, res) => {
  const config = await movieData.getConfig();
  const response = await movieData.getPopularList();
  return res.json({
    page: response.page,
    movies: response.results.map((movie) => {
      return {
        id: movie.id,
        title: movie.title,
        posterImage: `${config.images.secure_base_url}${config.images.poster_sizes[2]}${movie.poster_path}`
      }
    })
  });
});

app.post('/search', async (req, res) => {
  const config = await movieData.getConfig();
  const response = await movieData.search(req.body.query);
  return res.json({
    page: response.page,
    movies: response.results.map((movie) => {
      return {
        id: movie.id,
        title: movie.title,
        posterImage: `${config.images.secure_base_url}${config.images.poster_sizes[2]}${movie.poster_path}`
      }
    })
  });
});

app.get('/movie/:id', async (req, res) => {
  const config = await movieData.getConfig();
  const response = await movieData.getMovieDetails(req.params.id);
  response.poster_path = `${config.images.secure_base_url}original${response.poster_path}`;
  return res.json(response);
});

module.exports = app;
