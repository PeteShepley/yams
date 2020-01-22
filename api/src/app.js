const express = require('express');
const cors = require('cors');

const { MovieData } = require('./movie-data');

const app = express();
const movieData = new MovieData('');

app.use(cors());

app.get('/status', async (req, res) => {
  return res.json({status: 'OK'});
});

app.get('/popular', async (req, res) => {
  const popularMovies = await movieData.getPopularList();
  return res.json(popularMovies);
});

app.post('/search', async (req, res) => {
  return res.json({message: 'search for movies'});
});

app.get('/movie/:id', async (req, res) => {
  return res.json({message: 'get a movie'});
});

module.exports = app;
