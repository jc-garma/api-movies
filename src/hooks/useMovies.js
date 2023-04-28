import { useRef, useState, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies.js'

export function useMovies ({ search, sort }) {
  const [movies, setMovies] = useState([]) //
  const [loading, setLoading] = useState(false)
  // el error no se usa pero puedes implementarlo
  // si quieres:
  const [, setError] = useState(null)
  const previousSearch = useRef(search) // Guardar la referencia de la busqueda anterior. Aunque utilice el hook en varios sitios diferentes, el useRef lo tiene de manera interna

  /*const getMovies = async () => {
    const newMovies = await searchMovies({ search })
    setMovies(newMovies)
  }*/

  // funcion se ejecuta, se crea y destruye cada vez que se renderiza el componente o el custom hook
  // Solucion
  const getMovies = useCallback(async ({ search }) => {
    // Evitar buscar lo mismo
    if (search === previousSearch.current) return
    // search es ''

    try {
      setLoading(true)
      setError(null)
      previousSearch.current = search // Actualizamos la busqueda nueva
      const newMovies = await searchMovies({ search }) // Fetching y mapeo
      setMovies(newMovies) // Seteo
    } catch (e) {
      setError(e.message)
    } finally {
      // tanto en el try como en el catch
      setLoading(false)
    }
  }, [])

  // funcion se ejecuta cada vez que se renderiza el componente o el custom hook. Si no cambia la lista no volverla a ordenar
  // Solucion useMemo, calcula el nuevo orden cuando cambian las dependencias sort o movies, orden o peliculas no cuando se renderiza
  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title)) // copia del array de objetos, estado anterior [...movies]
      : movies
  }, [sort, movies])

  return { movies: sortedMovies, getMovies, loading }
}
