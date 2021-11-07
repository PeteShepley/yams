import * as React from "react";
import { MovieData } from "./MovieData";

const movieData = new MovieData();

export const MovieDataContext = React.createContext(movieData);
