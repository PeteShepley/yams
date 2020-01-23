import { observer } from 'mobx-react';
import * as React from 'react';
import { Link } from 'react-router-dom';
import * as debounce from 'debounce';

import { Movie } from '../data/MovieData';
import { MovieDataContext } from '../data/MovieDataContext';

import './MovieList.scss';

interface MoviePosterProps {
  movie: Movie;
}

class MoviePoster extends React.Component<MoviePosterProps> {
  public render() {
    const movie = this.props.movie;
    return (
        <div className="card" style={{width: '200px'}}>
          <Link to={`/movie/${movie.id}`}>
            <div className="card-image">
              <figure className="image">
                <img src={movie.posterImage} alt="Movie Poster"/>
                <div className="card-content movie-title">
                  <p>{movie.title}</p>
                </div>
              </figure>
            </div>
          </Link>
        </div>
    );
  }
}

interface MovieListProps {
}

@observer
export class MovieList extends React.Component<MovieListProps> {
  static contextType = MovieDataContext;

  constructor(props: any) {
    super(props);
    this.updateScroll = debounce(this.updateScroll, 250);
  }

  updateScroll(element: any) {
    // Borrowed logic from react-scroll-detector (https://github.com/rechat/react-scroll-detector)
    const top = element.scrollTop - element.clientTop;
    const end = element.scrollHeight - element.offsetHeight;

    if (top >= end - 100) {
      this.context.loading = true;
      this.context.loadMore().then(() => this.context.loading = false);
    }
  }

  render() {
    const movieData = this.context;
    return (
        <div className="movie-list">
          <h2 className="subtitle is-4">Movies</h2>
          <div className="list" onScroll={(event) => this.updateScroll(event.target)}>
            {movieData.movies.map((movie: Movie, index: number) =>
                <MoviePoster key={index} movie={movie}/>
            )}
          </div>
        </div>
    );
  }
}
