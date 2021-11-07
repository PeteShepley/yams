import * as React from "react";
import { MovieSearch } from "../components/MovieSearch";
import { MovieList } from "../components/MovieList";

export function Home() {
  return (
    <React.Fragment>
      <MovieSearch />
      <MovieList />
    </React.Fragment>
  );
}
