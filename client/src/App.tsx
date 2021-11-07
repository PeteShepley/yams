import { observer } from "mobx-react";
import * as React from "react";
import { useContext, useEffect } from "react";
import Loading from "react-loading";
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Routes
} from "react-router-dom";

import "./App.scss";

import { YamDot } from "./components/YamDot";

import { MovieDataContext } from "./data/MovieDataContext";

import { Home } from "./pages/Home";
import { MovieDetails } from "./pages/MovieDetails";

export const App = observer(() => {
  const movieData = useContext(MovieDataContext);

  useEffect(() => {
    movieData.initialize();
  });

  return (
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
          style={{ display: movieData.loading ? "flex" : "none" }}
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
  );
});
