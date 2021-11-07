import * as React from "react";
import { MovieSearch } from "../components/MovieSearch";
import { MovieList } from "../components/MovieList";

export class Home extends React.Component<any, any> {
  public render(): any {
    return (
      <React.Fragment>
        <MovieSearch />
        <MovieList />
      </React.Fragment>
    );
  }
}
