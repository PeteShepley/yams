import { observer } from 'mobx-react';
import * as React from 'react';
import { MovieDataContext } from '../data/MovieDataContext';

interface MovieSearchState {
  searchTerm: string;
}

@observer
export class MovieSearch extends React.Component<any, MovieSearchState> {
  static contextType = MovieDataContext;

  constructor(props: any) {
    super(props);
    this.state = {
      searchTerm: ''
    };
  }

  public updateSearchTerm(term: string) {
    this.setState({
      searchTerm: term
    });
  }

  public checkKeyDown(key: string) {
    if (key === 'Enter') {
      this.runSearch();
    }
  }

  public runSearch() {
    const movieData = this.context;
    if (!!this.state.searchTerm) {
      movieData.loading = true;
      movieData.search(this.state.searchTerm).then(() => movieData.loading = false);
    }
  }

  public render() {
    return (
        <div className="field is-grouped">
          <p className="control is-expanded">
            <input className="input" type="text" placeholder="Search for a movie" value={this.state.searchTerm}
                   disabled={this.context.loading}
                   onKeyDown={(event) => this.checkKeyDown(event.key)}
                   onChange={(event) => this.updateSearchTerm(event.currentTarget.value)}/>
          </p>
          <p className="control">
            <button className="button is-info" onClick={() => this.runSearch()} disabled={this.context.loading}>
              Search
            </button>
          </p>
        </div>
    );
  }
}
