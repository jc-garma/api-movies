import React from "react";
import ListOfMovies from "../../components/ListOfMovies/ListOfMovies";
import NoMoviesResults from "../../components/NoMoviesResults/NoMoviesResults";

export function Movies({ movies, favourites, setFavourites }) {
  console.log('movies',movies);
  const hasMovies = movies?.length > 0;
  const itemsPerPage = 5;

  return hasMovies ? (
    <ListOfMovies itemsPerPage={itemsPerPage} movies={movies} favourites={favourites} setFavourites={setFavourites}/>
  ) : (
    <NoMoviesResults />
  );
}
