import React, { useState } from "react";

function ListOfMovies({ itemsPerPage, movies }) {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPages = Math.ceil(movies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = movies.slice(startIndex, endIndex);

  function handlePageChange(newPage) {
    if (newPage >= 1 && newPage <= maxPages) {
      setCurrentPage(newPage);
    }
  }

  return (
    <div>
      <ul className="movies">
        {
          /*!loading && !error && */ currentItems.length > 0 &&
            currentItems.map((movie) => (
              //
              <li className="movie" key={movie.id}>
                <h3>{movie.title}</h3>
                <p>{movie.year}</p>
                <p>{movie.released}</p>
                <div class="container">
                  <img src={movie.image} alt={movie.title}/>
                  <button class="heart-button">
                    <i class="fa fa-heart"></i>
                  </button>
                </div>
              </li>
            ))
        }
      </ul>
      <div className="pagination">
        <button
          id="previousBtn"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={!(currentPage > 1)}
        >
          Previous
        </button>

        <button
          id="nextBtn"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={!(currentPage < maxPages)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

function NoMoviesResults() {
  return <p>No se encontraron películas para esta búsqueda</p>;
}

export function Movies({ movies }) {
  console.log('movies',movies);
  const hasMovies = movies?.length > 0;
  const itemsPerPage = 5;

  return hasMovies ? (
    <ListOfMovies itemsPerPage={itemsPerPage} movies={movies} />
  ) : (
    <NoMoviesResults />
  );
}
