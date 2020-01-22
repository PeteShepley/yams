import * as React from 'react';

export class MovieSearch extends React.Component {
  render() {
    return (
        <div className="field is-grouped">
          <p className="control is-expanded">
            <input className="input" type="text" placeholder="Search for a movie"/>
          </p>
          <p className="control">
            <button className="button is-info">
              Search
            </button>
          </p>
        </div>
    );
  }
}
