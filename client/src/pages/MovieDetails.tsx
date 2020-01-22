import React from 'react';
import { MovieDataContext } from '../data/MovieDataContext';

export class MovieDetails extends React.Component<any, any> {
  static contextType = MovieDataContext;

  constructor(props: any) {
    super(props);
    this.state = {
      movie: null
    };
  }

  public componentDidMount(): void {
    const movieData = this.context;
    const movieId = this.props.match.params.movieId;
    movieData.loading = true;
    movieData.fetchMovie(movieId).then((movie: any) => {
      this.setState({movie});
      movieData.loading = false;
    });
  }

  public render() {
    console.log(this.state.movie);
    const genreTags = this.createGenreTags(this.state.movie);
    return (
        <div className="media">
          <figure className="media-left" style={{width: '25%'}}>
            <img src={this.state.movie?.poster_path} alt="Movie Poster" />
          </figure>
          <div className="media-content">
            <div className="level-left">
              <span className="level-item"><h2 className="subtitle is-3">{this.state.movie?.title}</h2></span>
              <span className="level-item">{this.state.movie?.release_date}</span>
              <span className="level-item">{this.state.movie?.runtime} Minutes</span>
            </div>
            <p className="content">{this.state.movie?.overview}</p>
            <div className="level" style={{width: '50%'}}>
              <span className="level-item">Genres:</span>
              <span className="level-item tags">{genreTags}</span>
            </div>
          </div>
        </div>
    );
  }

  private createGenreTags(movie: any) {
    if (!movie) return [];
    return movie.genres.map((genre: any, index: number) => {
      return (
          <div key={index} className="tag">{genre.name}</div>
      );
    });
  }
}
