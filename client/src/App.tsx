import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { YamDot } from './components/YamDot';
import { MovieData } from './data/MovieData';

import { MovieDataContext } from './data/MovieDataContext';
import { Home } from './pages/Home';

import './App.scss';

const movieData = new MovieData();
movieData.loadPopularMovies().then(() => console.log('completed'));

export class App extends React.Component<any, any> {
  public render(): any {
    return (
        <MovieDataContext.Provider value={movieData}>
          <Router>
            <header>
              <div className="navbar">
                <div className="navbar-start">
                  <h1 className="title is-1">Y<YamDot />A<YamDot />M<YamDot />S</h1>
                </div>
                <div className="navbar-end"></div>
              </div>
            </header>
            <main>
              <Switch>
                <Route exact path="/" component={Home}/>
              </Switch>
            </main>
            <div className="app-footer">
              <p>Pete Shepley &copy; {new Date().getUTCFullYear()}</p>
            </div>
          </Router>
        </MovieDataContext.Provider>
    );
  }
}
