import { makeAutoObservable } from "mobx";

const BASE_API = "http://localhost:8080";

// const BASE_API = 'https://js1jnc0mrj.execute-api.us-east-1.amazonaws.com/dev';

export interface Movie {
  id: string;
  posterImage: string;
  title: string;
  poster_path?: string;
  release_date?: Date;
  runtime?: string;
  overview?: string;
  genres: any[];
  credits: { crew: any[]; cast: any[] };
}

export class MovieData {
  public loading: boolean;
  public movies: Movie[];

  currentPage: number;
  lastQueryType: string;
  lastQuery: string;

  constructor() {
    this.loading = false;
    this.movies = [];
    this.currentPage = 0;
    this.lastQueryType = "";
    this.lastQuery = "";

    makeAutoObservable(this);
  }

  public isLoading(loading: boolean): void {
    this.loading = loading;
  }

  public setMovies(movies: Movie[]): void {
    this.movies = movies;
  }

  public initialize(): void {
    // this.isLoading(true);
    this.loadPopularMovies(); //.then(() => this.isLoading(false));
  }

  public async loadPopularMovies(): Promise<void> {
    if (this.lastQueryType !== "popular") {
      this.setMovies([]);
      this.currentPage = 0;
    }

    const response = await fetch(
      `${BASE_API}/popular?page=${this.currentPage + 1}`
    ).then((response) => response.json());
    this.currentPage = response.page;
    this.lastQueryType = "popular";
    this.setMovies(this.movies.concat(response.movies));
  }

  public async search(searchTerm: string): Promise<void> {
    if (this.lastQueryType !== "search" || this.lastQuery !== searchTerm) {
      this.setMovies([]);
      this.currentPage = 0;
    }
    const body = JSON.stringify({ query: searchTerm });
    const request = new Request(
      `${BASE_API}/search?page=${this.currentPage + 1}`,
      {
        method: "post",
        body: body,
        headers: { "Content-Type": "application/json" }
      }
    );
    const response = await fetch(request).then((response) => response.json());
    this.currentPage = response.page;
    this.lastQueryType = "search";
    this.lastQuery = searchTerm;
    this.setMovies(this.movies.concat(response.movies));
  }

  public async loadMore(): Promise<void> {
    // this.isLoading(true);
    if (this.lastQueryType === "popular") {
      return this.loadPopularMovies(); //.then(() => this.isLoading(false));
    } else if (this.lastQueryType === "search") {
      return this.search(this.lastQuery); //.then(() => this.isLoading(false));
    }
  }

  public async fetchMovie(movieId: string): Promise<any> {
    return await fetch(`${BASE_API}/movie/${movieId}`).then((response) =>
      response.json()
    );
  }
}
