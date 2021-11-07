import React from "react";
import { MovieDataContext } from "../data/MovieDataContext";

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
      this.setState({ movie });
      movieData.loading = false;
    });
  }

  public render() {
    const genreTags = this.createGenreTags(this.state.movie);
    const actorTags = this.createActorTags(this.state.movie);
    const directorTag = this.createDirectorTag(this.state.movie);
    return (
      <div className="media" style={{ width: "75%" }}>
        <figure className="media-left" style={{ width: "25%" }}>
          <img src={this.state.movie?.poster_path} alt="Movie Poster" />
        </figure>
        <div className="media-content">
          <div className="level-left">
            <span className="level-item">
              <h2 className="subtitle is-3">{this.state.movie?.title}</h2>
            </span>
            <span className="level-item">{this.state.movie?.release_date}</span>
            <span className="level-item">
              {this.state.movie?.runtime} Minutes
            </span>
          </div>
          <p className="content">{this.state.movie?.overview}</p>
          <div style={{ width: "50%", margin: "0.5rem" }}>
            <span className="label">Genres:</span>
            <span className="tags">{genreTags}</span>
          </div>
          <div style={{ width: "50%", margin: "0.5rem" }}>
            <span className="label">Actors:</span>
            <span className="tags">{actorTags}</span>
          </div>
          <div style={{ width: "50%", margin: "0.5rem" }}>
            <span className="label">Director:</span>
            <span className="tags">{directorTag}</span>
          </div>
        </div>
      </div>
    );
  }

  private createGenreTags(movie: any) {
    if (!movie) return [];
    return movie.genres.map((genre: any, index: number) => {
      return (
        <div key={index} className="tag">
          {genre.name}
        </div>
      );
    });
  }

  private createActorTags(movie: any) {
    if (!movie) return [];

    return movie.credits.cast.slice(0, 3).map((actor: any, index: number) => {
      return (
        <div key={index} className="tag">
          {actor.name}
        </div>
      );
    });
  }

  private createDirectorTag(movie: any) {
    if (!movie) return [];

    const director = movie.credits.crew.find(
      (c: any) => c.department === "Directing" && c.job === "Director"
    );
    return <div className="tag">{director.name}</div>;
  }
}
