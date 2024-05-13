import './App.css'
import { useMovies } from './hooks/useMovies.js'
import { useSearch } from './hooks/useSearch.js'
import { Movies } from './pages/Movies/Movies.jsx'
import { useState, useEffect, useCallback } from 'react'
import debounce from 'just-debounce-it'
import Header from './components/Header/Header'


function App () {
  const [sort, setSort] = useState(false)
  const [sortReleaseSort, setReleaseSort] = useState(false)

  // Componentes limpios, sacar la lógica de los componentes fuera, con custom hooks
  const { search, updateSearch, error } = useSearch()
  const { movies, loading, getMovies, favourites, setFavourites } = useMovies({ search, sort, sortReleaseSort })

  const debouncedGetMovies = useCallback(
    debounce(search => {
      console.log('search', search)
      getMovies({ search })
    }, 300)
    , [getMovies]
  )

  // Para cargar los datos del formulario a partir de la busqueda
  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search }) // Recuperar las peliculas con filtrado
  }

  // Ordenar las películas por título alfabeticamente 
  const handleSort = () => {
    setSort(!sort)
    setReleaseSort(false)
  }

  // Ordenar las películas descendentemente por fecha de salida 
  const handleReleaseSort = () => {
    setReleaseSort(!sortReleaseSort)
    setSort(false)
  }

  // Forma controlada
  const handleChange = (event) => {
    const newSearch = event.target.value // event.target el propio input, nos aseguramos que coje el nuevo estado
    updateSearch(newSearch) // Seteamos el estado y vemos en la propiedad value del input el nuevo valor del estado
    debouncedGetMovies(newSearch)
  }

  return (
    <>
    <Header/>
    <div className='page'>  
      <header id='header'>
        <h1>🎬 Buscador de películas</h1>
        <br/>
        <form className='form' onSubmit={handleSubmit}>
          <input
            style={{
              border: '1px solid transparent',
              borderColor: error ? 'red' : 'transparent'
            }} onChange={handleChange} value={search} name='query' placeholder='Avengers, Star Wars, The Matrix...'
          />
          <button type='submit'>🔍 Buscar</button>
           {/*<input name="query" placeholder='Avengers, Star Wars ...'/>*/}
          {/*<input ref={inputRef} type='checkbox' onChange={handleSort} checked={sort} />*/}
          {/*<button onClick={handleClick} type='submit'>Buscar</button>*/}
          <label>Ordenar por Título:
            <input type='checkbox' onChange={handleSort} checked={sort} />
          </label>
          <label>Ordenar por Release:
            <input type='checkbox' onChange={handleReleaseSort} checked={sortReleaseSort} />
          </label>
          
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>
        {
          loading ? <p>Cargando...</p> : <Movies movies={movies} favourites={favourites} setFavourites={setFavourites} />
        }
      </main>
    </div>
    </>
  )
}


export default App
