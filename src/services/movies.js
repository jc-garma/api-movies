const API_KEY = '4287ad07'

export const searchMovies = async ({ search }) => {
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);
  if (search === '') return null

  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
    const json = await response.json()

    const movies = json.Search

    //setError(false);

    // Mapeamos los datos de que vienen de la app de mayusculas a minúsculas
    return movies?.map(movie => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      image: movie.Poster
    }))
  } catch (e) {
    //setError(e);
    throw new Error('Error searching movies')
  } /*finally { // Se ejecuta siempre se haya resuelto la promesa o mostrado el error
    setLoading(false);
  }*/
}
