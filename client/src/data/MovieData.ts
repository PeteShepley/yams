import { action, observable } from 'mobx';

const BASE_API = 'https://js1jnc0mrj.execute-api.us-east-1.amazonaws.com/dev';

export interface Movie {
  id: string;
  posterImage: string;
  title: string;
}

export class MovieData {
  @observable
  public loading: boolean;

  @observable
  public movies: Movie[];

  constructor() {
    this.loading = false;
    this.movies = [];
  }

  @action
  public async initialize(): Promise<void> {
    return Promise.all([this.loadPopularMovies()]).then(() => console.log('MovieData Initialized'));
  }

  @action
  public async loadPopularMovies(): Promise<void> {
    const response = await fetch(`${BASE_API}/popular`).then(response => response.json());
    this.movies = response.movies;
  }

  @action
  public async search(searchTerm: string): Promise<void> {
    const body = JSON.stringify({query: searchTerm});
    const request = new Request(`${BASE_API}/search`, {method: 'post', body: body, headers: {'Content-Type': 'application/json'}});
    const response = await fetch(request).then(response => response.json());
    this.movies = response.movies;
  }

  @action
  public async fetchMovie(movieId: number): Promise<any> {
    const response = await fetch(`${BASE_API}/movie/${movieId}`).then(response => response.json());
    return response;
  }
}
