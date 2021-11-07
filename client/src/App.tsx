import * as React from "react";
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Routes
} from "react-router-dom";
import Loading from "react-loading";
import { observer } from "mobx-react";

import { MovieData } from "./data/MovieData";
import { MovieDataContext } from "./data/MovieDataContext";

import { Home } from "./pages/Home";
import { MovieDetails } from "./pages/MovieDetails";

import { YamDot } from "./components/YamDot";

import "./App.scss";

@observer
export class App extends React.Component<any, any> {
  private readonly movieData: MovieData;

  constructor(props: any) {
    super(props);
    this.movieData = new MovieData();
  }

  componentDidMount(): void {
    this.movieData.loading = true;
    this.movieData.initialize().then(() => (this.movieData.loading = false));
  }

  public render(): any {
    return (
      <MovieDataContext.Provider value={this.movieData}>
        <Router>
          <header>
            <div className="navbar">
              <div className="navbar-brand">
                <h1 className="title is-1">
                  Y<YamDot />A<YamDot />M<YamDot />S
                </h1>
              </div>
              <div className="navbar-menu">
                <div className="navbar-start">
                  <NavLink className="navbar-item" to="/">
                    Home
                  </NavLink>
                </div>
              </div>
            </div>
          </header>
          <main>
            <div
              className="loading-area"
              style={{ display: this.movieData.loading ? "flex" : "none" }}
            >
              <Loading type="spinningBubbles" color="black" />
            </div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movie/:movieId" element={<MovieDetails />} />
            </Routes>
          </main>
          <div className="app-footer">
            <p>Pete Shepley &copy; {new Date().getUTCFullYear()}</p>
          </div>
        </Router>
      </MovieDataContext.Provider>
    );
  }
}
