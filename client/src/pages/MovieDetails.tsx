import { observer } from "mobx-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";

import { Movie } from "../data/MovieData";
import { MovieDataContext } from "../data/MovieDataContext";

export const MovieDetails = observer(() => {
  const { movieId } = useParams();

  const [movie, setMovie] = useState({} as Movie);
  const movieData = useContext(MovieDataContext);

  useEffect(() => {
    if (movieId) {
      movieData.fetchMovie(movieId).then((movie: any) => {
        setMovie(movie);
      });
    }
  });

  return (
    <div className="media" style={{ width: "75%" }}>
      <figure className="media-left" style={{ width: "25%" }}>
        <img src={movie?.poster_path} alt="Movie Poster" />
      </figure>
      <div className="media-content">
        <div className="level-left">
          <span className="level-item">
            <h2 className="subtitle is-3">{movie?.title}</h2>
          </span>
          <span className="level-item">{movie?.release_date}</span>
          <span className="level-item">{movie?.runtime} Minutes</span>
        </div>
        <p className="content">{movie?.overview}</p>
      </div>
    </div>
  );
});
