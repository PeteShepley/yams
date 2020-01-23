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

function createMovieListResponse(response, config) {
  return {
    page: response.page,
    movies: response.results.map((movie) => {
      return {
        id: movie.id,
        title: movie.title,
        posterImage: `${config.images.secure_base_url}${config.images.poster_sizes[2]}${movie.poster_path}`
      };
    })
  };
}

app.get('/popular', async (req, res) => {
  const config = await movieData.getConfig();
  const page = req.query.page ? req.query.page : 1;
  const response = await movieData.getPopularList(page);
  return res.json(createMovieListResponse(response, config));
});

app.post('/search', async (req, res) => {
  const config = await movieData.getConfig();
  const page = req.query.page ? req.query.page : 1;
  const response = await movieData.search(req.body.query, page);
  return res.json(createMovieListResponse(response, config));
});

app.get('/next', async (req, res) => {
  // TODO: Create a next token service for fetching the next page of a movie list request.
  return res.status(501).json({message: 'Next Token Service Not Implemented'});
});

app.get('/movie/:id', async (req, res) => {
  const config = await movieData.getConfig();
  const response = await movieData.getMovieDetails(req.params.id);
  response.poster_path = `${config.images.secure_base_url}original${response.poster_path}`;
  return res.json(response);
});

module.exports = app;
