import { action, observable } from 'mobx';

export interface Movie {
  posterImage: string;
  title: string;
}

export class MovieData {
  @observable
  public movies: Movie[];

  constructor() {
    this.movies = [];
  }

  @action
  public async loadPopularMovies(): Promise<void> {
  }
}
