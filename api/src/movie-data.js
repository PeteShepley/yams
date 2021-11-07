const axios = require("axios");

class MovieData {
  constructor() {
    this.apiKey = "743c9f95081962b5b20c0158d26fca84";
    this.apiBase = "https://api.themoviedb.org/3";
  }

  async getConfig() {
    const options = {
      method: "get",
      url: `${this.apiBase}/configuration?api_key=${this.apiKey}`,
    };
    return axios(options).then((response) => response.data);
  }

  async getPopularList(page) {
    const options = {
      method: "get",
      url: `${this.apiBase}/movie/popular?api_key=${this.apiKey}&page=${page}`,
    };
    return axios(options).then((response) => response.data);
  }

  async search(query, page) {
    const options = {
      method: "get",
      url: `${this.apiBase}/search/movie?api_key=${this.apiKey}&query=${query}&page=${page}`,
    };
    return axios(options).then((response) => response.data);
  }

  async getMovieDetails(movieId) {
    const options = {
      get: "get",
      url: `${this.apiBase}/movie/${movieId}?api_key=${this.apiKey}`,
    };
    const movie = await axios(options).then((response) => response.data);

    options.url = `${this.apiBase}/movie/${movieId}/credits?api_key=${this.apiKey}`;
    const credits = await axios(options).then((response) => response.data);
    movie.credits = credits;

    return movie;
  }
}

module.exports = {
  MovieData,
};
