import { observer } from "mobx-react";
import { useContext, useState } from "react";
import * as React from "react";
import { MovieDataContext } from "../data/MovieDataContext";

export const MovieSearch = observer(() => {
  const [searchTerm, setSearchTerm] = useState("");
  const movieData = useContext(MovieDataContext);

  function runSearch() {
    if (!!searchTerm) {
      movieData.isLoading(true);
      movieData.search(searchTerm).then(() => movieData.isLoading(false));
    }
  }

  function checkKeyDown(key: string) {
    if (key === "Enter") {
      runSearch();
    }
  }

  return (
    <div className="field is-grouped">
      <p className="control is-expanded">
        <input
          className="input"
          type="text"
          placeholder="Search for a movie"
          value={searchTerm}
          disabled={movieData.loading}
          onKeyDown={(event) => checkKeyDown(event.key)}
          onChange={(event) => setSearchTerm(event.currentTarget.value)}
        />
      </p>
      <p className="control">
        <button
          className="button is-info"
          onClick={() => runSearch()}
          disabled={movieData.loading}
        >
          Search
        </button>
      </p>
    </div>
  );
});
