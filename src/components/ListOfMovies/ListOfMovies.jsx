import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";

export default function ListOfMovies({ itemsPerPage, movies, favourites, setFavourites }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [activeMovies, setActiveMovies] = useState({});
    const [lastClickedMovie, setLastClickedMovie] = useState(null);
  
    const maxPages = Math.ceil(movies.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = movies.slice(startIndex, endIndex);
  
    /**
     * 
     * @param {*} items
     * el parametro items recibe un objeto con los elementos a almacenar en el 
     * local storage.
     */
    const saveToLocalStorage = (items) => {
          localStorage.setItem('favourites', JSON.stringify(items));
      }
  
    const handleClick = (movie) => {
      setActiveMovies(prevState => ({
        ...prevState,
        [movie.id]: !prevState[movie.id],
     }));
  
     // Actualiza el estado de la última película clicada
     setLastClickedMovie(movie);
    };
     
     // añadir a Favoritos
     const addFavouriteMovie = (movie) => {
      //console.log('Añadimos', movie)
          const newFavouriteList = [...favourites, movie];
          setFavourites(newFavouriteList);
          saveToLocalStorage(newFavouriteList); 
      };
     
    // quitar de Favoritos
    const removeFavouriteMovie = (movie) => {
      //console.log('Quitamos', movie)
          const newFavouriteList = favourites.filter(
              (favourite) => favourite.id !== movie.id
          );
          setFavourites(newFavouriteList);
          saveToLocalStorage(newFavouriteList);
      };
  
    function handlePageChange(newPage) {
      if (newPage >= 1 && newPage <= maxPages) {
        setCurrentPage(newPage);
      }
    }
  
    useEffect(() => {
      console.log('activeMovies',activeMovies)
      if (lastClickedMovie) {
        if (activeMovies[lastClickedMovie.id]) {
          addFavouriteMovie(lastClickedMovie);
        } else {
          removeFavouriteMovie(lastClickedMovie);
        }
      }
    }, [lastClickedMovie, activeMovies]);
    
    
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
                      {/* <FaHeart  className="heart-button" onClick={() => handleClick(movie.id)} color={activeMovies[movie.id] ? 'red' : 'gray'} size="30px"/>      */}
                      <FaHeart  className="heart-button" onClick={() => handleClick(movie)} color={activeMovies[movie.id] ? 'red' : 'gray'} size="30px"/>
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