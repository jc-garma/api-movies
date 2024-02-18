import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";

function ListOfMovies({ itemsPerPage, movies }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeMovies, setActiveMovies] = useState({});
  const maxPages = Math.ceil(movies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = movies.slice(startIndex, endIndex);

  const handleClick = (movieId) => {
    setActiveMovies(prevState => ({
       ...prevState,
       [movieId]: !prevState[movieId],
    }));
   };
   

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
              movie.image !=='N/A' && (
              <li className="movie" key={movie.id}>
                <h3>{movie.title}</h3>
                <p>{movie.year}</p>
                <p>{movie.released}</p>
                <div class="container">
                  <img src={movie.image} alt={movie.title} style={{ width: '300px', height: '405px' }} className="fixed-image"/>
                  {/* <button className="heart-button" onClick={() => handleClick(movie.id)} key={movie.id} > */}
                    <FaHeart  className="heart-button" onClick={() => handleClick(movie.id)} color={activeMovies[movie.id] ? 'red' : 'gray'} size="30px"/>
                  {/* </button> */}
                </div>
              </li>
               )
            ))
        }
      </ul>
      <div className="pagination">
        <button
          id="previousBtn"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={!(currentPage > 1)}
        >
          Anterior
        </button>

        <button
          id="nextBtn"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={!(currentPage < maxPages)}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

function NoMoviesResults() {
  return <p>No se encontraron elementos para esta búsqueda.</p>;
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
