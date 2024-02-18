import './App.css'
import { useMovies } from './hooks/useMovies.js'
import { Movies } from './components/Movies.jsx'
import { useState, useEffect, useRef, useCallback } from 'react'
import debounce from 'just-debounce-it'
import Header from './components/Header/Header'

// Custom Hook
function useSearch () {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  // Forma descontrolada
 // Ejemplo useRef, refencia del DOM
 // const inputRef = useRef() // Crea un objeto para la refrencia
 /*const handleSubmit = (event) => {
  event.preventDefault();
  const inputEl = inputRef.current; // Recuperar el elemento del DOM como querySelector
  const value = inputEl.value; // Accedemos al valor cambiado
  console.log(value);
 }*/

  /*const handleSubmit = (event) => {
    event.preventDefault();
    const fields = Object.fromEntries(new window.FormData(event.target))
    // const { query } = Object.fromEntries(new window.FormData(event.target))
    // console.log(query);
    console.log(fields); // Objeto de values de todos los campos del formulario
  }*/

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setError('No se puede buscar una película vacía')
      return
    }

    if (search.match(/^\d+$/)) {
      setError('No se puede buscar una película con un número')
      return
    }

    if (search.length < 3) {
      setError('La búsqueda debe tener al menos 3 caracteres')
      return
    }

    setError(null)
  }, [search])

  return { search, updateSearch, error }
}

function App () {
  const [sort, setSort] = useState(false)
  const [sortReleaseSort, setReleaseSort] = useState(false)

  // Componentes limpios, sacar la lógica de los componentes fuera, con custom hooks
  const { search, updateSearch, error } = useSearch()
  const { movies, loading, getMovies } = useMovies({ search, sort, sortReleaseSort })

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
          loading ? <p>Cargando...</p> : <Movies movies={movies} />
        }
      </main>
    </div>
    </>
  )
}

// Hook
function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );

  return debouncedValue;
}

export default App
