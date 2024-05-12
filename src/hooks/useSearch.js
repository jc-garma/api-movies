import { useState, useEffect, useRef } from 'react'


export function useSearch () {
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