const API_KEY = '4287ad07'

export const searchMovies = async ({ search }) => {
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);
  if (search === '') return null

  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)

    // Verificar si el estado de la respuesta es 400
    if (response.status === 400) {
      throw new Error('Bad request');
    }

    const json = await response.json()

    const movies = json.Search

    //setError(false);
    console.log('movies',movies);

    // Mapeamos los datos de que vienen de la app de mayusculas a minúsculas
    return movies
  ?.filter(movie => movie.Type === 'movie' || movie.Type === 'series')
  .map(movie => ({
    id: movie.imdbID,
    title: movie.Title,
    released: convertirFecha(generarFechaAleatoria()), //movie.Released '04 May  2012'
    year: movie.Year,
    image: movie.Poster // Si movie.Poster existe, lo asigna, sino asigna una cadena vacía
  }));

    // return movies?.map(movie => ({
    //   id: movie.imdbID,
    //   title: movie.Title,
    //   released: convertirFecha(generarFechaAleatoria()), //movie.Released '04 May 2012'
    //   year: movie.Year,
    //   image: movie.Poster
    // }))
  } catch (e) {
    //setError(e);
    throw new Error('Error searching movies')
  } /*finally { // Se ejecuta siempre se haya resuelto la promesa o mostrado el error
    setLoading(false);
  }*/
}

function convertirFecha(fecha) {
  let partes = fecha.split(' ');
  let dia = partes[0];
  let mes = partes[1];
  let anio = partes[2];

  let meses = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  let mesNumerico = meses.indexOf(mes);

  let fechaFormateada = new Date(anio, mesNumerico, dia);

  let diaFormateado = fechaFormateada.getDate().toString().padStart(2, '0');
  let mesFormateado = (fechaFormateada.getMonth() + 1).toString().padStart(2, '0');
  let anioFormateado = fechaFormateada.getFullYear();

  return `${diaFormateado}/${mesFormateado}/${anioFormateado}`;
}

function generarFechaAleatoria() {
  // Obtén números aleatorios para el día, mes y año
  let dia = Math.floor(Math.random() * 31) + 1;
  let mes = Math.floor(Math.random() * 12);
  let anio = Math.floor(Math.random() * (2023 - 2000)) + 2000;

  // Crea un objeto Date con los números aleatorios
  let fecha = new Date(anio, mes, dia);

  // Formatea la fecha en el formato deseado (04 May 2012)
  let opcionesFormato = { day: '2-digit', month: 'short', year: 'numeric' };
  let fechaFormateada = fecha.toLocaleDateString('es', opcionesFormato);

  return fechaFormateada;
}