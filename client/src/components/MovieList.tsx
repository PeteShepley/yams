import { observer } from 'mobx-react';
import * as React from 'react';

import { Movie } from '../data/MovieData';
import { MovieDataContext } from '../data/MovieDataContext';

import './MovieList.scss';

class MoviePoster extends React.Component<any, any> {
  public render() {
    const movie = this.props.movie;
    return (
        <div className="card">
          <div className="card-image">
            <figure className="image">
              <img src={movie.posterImage} alt="Placeholder image"/>
            </figure>
            <div className="card-content">
              {movie.title}
            </div>
          </div>
        </div>
    )
  }
}

interface MovieListProps {
}

@observer
export class MovieList extends React.Component<MovieListProps> {
  static contextType = MovieDataContext;

  render() {
    return (
        <div className="movie-list">
          <h2 className="subtitle is-4">Movies</h2>
          <div className="list">
          {this.context.movies.map((movie: Movie, index: number) =>
            <MoviePoster key={index} movie={movie}></MoviePoster>
          )}
          </div>
        </div>
    );
  }
}
