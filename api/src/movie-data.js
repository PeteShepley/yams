const request = require('request-promise-native');

class MovieData {
  constructor() {
    this.apiKey = '743c9f95081962b5b20c0158d26fca84';
    this.apiBase = 'https://api.themoviedb.org/3';
  }

  async getConfig() {
    const options = {
      uri: `${this.apiBase}/configuration`,
      qs: {
        api_key: this.apiKey
      },
      json: true
    };
    return request(options);
  }

  async getPopularList(page) {
    const options = {
      uri: `${this.apiBase}/movie/popular`,
      qs: {
        api_key: this.apiKey,
        page
      },
      json: true
    };
    return request(options);
  }

  async search(query, page) {
    const options = {
      uri: `${this.apiBase}/search/movie`,
      qs: {
        api_key: this.apiKey,
        query: query,
        page
      },
      json: true
    };
    return request(options);
  }

  async getMovieDetails(movieId) {
    const options = {
      uri: `${this.apiBase}/movie/${movieId}`,
      qs: {
        api_key: this.apiKey
      },
      json: true
    };
    const movie = await request(options);

    options.uri = `${this.apiBase}/movie/${movieId}/credits`;
    const credits = await request(options);
    movie.credits = credits;

    return movie;
  }
}

module.exports = {
  MovieData
};
