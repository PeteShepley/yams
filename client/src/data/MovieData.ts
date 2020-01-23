import { action, observable } from 'mobx';

const BASE_API = 'http://localhost:8080';
// const BASE_API = 'https://js1jnc0mrj.execute-api.us-east-1.amazonaws.com/dev';

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

  currentPage: number;
  lastQueryType: string;
  lastQuery: string;

  constructor() {
    this.loading = false;
    this.movies = [];
    this.currentPage = 0;
    this.lastQueryType = '';
    this.lastQuery = '';
  }

  @action
  public async initialize(): Promise<void> {
    return Promise.all([this.loadPopularMovies()]).then(() => console.log('MovieData Initialized'));
  }

  @action
  public async loadPopularMovies(): Promise<void> {
    if (this.lastQueryType !== 'popular') {
      this.movies = [];
      this.currentPage = 0;
    }

    const response = await fetch(`${BASE_API}/popular?page=${this.currentPage+1}`).then(response => response.json());
    this.currentPage = response.page;
    this.lastQueryType = 'popular';
    this.movies = this.movies.concat(response.movies);
  }

  @action
  public async search(searchTerm: string): Promise<void> {
    if (this.lastQueryType !== 'search' || this.lastQuery !== searchTerm) {
      this.movies = [];
      this.currentPage = 0;
    }
    const body = JSON.stringify({query: searchTerm});
    const request = new Request(`${BASE_API}/search?page=${this.currentPage+1}`, {method: 'post', body: body, headers: {'Content-Type': 'application/json'}});
    const response = await fetch(request).then(response => response.json());
    this.currentPage = response.page;
    this.lastQueryType = 'search';
    this.lastQuery = searchTerm;
    this.movies = this.movies.concat(response.movies);
  }

  @action
  public async loadMore(): Promise<void> {
    if (this.lastQueryType === 'popular') {
      return this.loadPopularMovies();
    } else if (this.lastQueryType === 'search') {
      return this.search(this.lastQuery);
    }
  }

  @action
  public async fetchMovie(movieId: number): Promise<any> {
    const response = await fetch(`${BASE_API}/movie/${movieId}`).then(response => response.json());
    return response;
  }
}
