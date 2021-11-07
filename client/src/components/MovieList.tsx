import { debounce } from "debounce";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";

import { Movie, MovieData } from "../data/MovieData";
import { MovieDataContext } from "../data/MovieDataContext";

import "./MovieList.scss";

interface MoviePosterProps {
  movie: Movie;
}

const MoviePoster = (props: MoviePosterProps) => {
  const movie = props.movie;
  return (
    <div className="card" style={{ width: "200px" }}>
      <Link to={`/movie/${movie.id}`}>
        <div className="card-image">
          <figure className="image">
            <img src={movie.posterImage} alt="Movie Poster" />
            <div className="card-content movie-title">
              <p>{movie.title}</p>
            </div>
          </figure>
        </div>
      </Link>
    </div>
  );
};

export const MovieList = observer(() => {
  const movieData: MovieData = useContext(MovieDataContext);

  const updateScroll = debounce((element: any) => {
    // Borrowed logic from react-scroll-detector (https://github.com/rechat/react-scroll-detector)
    const top = element.scrollTop - element.clientTop;
    const end = element.scrollHeight - element.offsetHeight;

    if (top >= end - 100) {
      movieData.loadMore();
    }
  }, 250);

  return (
    <div className="movie-list">
      <h2 className="subtitle is-4">Movies</h2>
      <div className="list" onScroll={(event) => updateScroll(event.target)}>
        {movieData.movies.map((movie: Movie, index: number) => (
          <MoviePoster key={index} movie={toJS(movie)} />
        ))}
      </div>
    </div>
  );
});
