import { createContext } from "react";
import { MovieData } from "./MovieData";

export const MovieDataContext = createContext<MovieData>(new MovieData());
