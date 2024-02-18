import { useCallback, useContext, useState } from "react";
import { Context } from "../context/UserContext.jsx";
//import jwt from 'jsonwebtoken';

//Custom Hook: única forma de utilizar hooks dentro. Lógica compartida por componentes
export default function useUser() {
  // Consumimos el contexto
  const { jwtState, setJWTState } = useContext(Context);
  const [registered, setRegistered] = useState(false)

  // Seteo token login
  const login = useCallback(({ username, password }) => {
    let usuarios = JSON.parse(localStorage.getItem('usuarios'));

    const exists = usuarios.some(user => user.username === username && user.password === password);

    if (!exists) {
      console.log('401 Unauthorized')
      return;
   } else {
    // const token = jwt.sign({ username: username }, 'secretKey');
    // console.log("token:", token)

    // // Guardas el token en el localStorage.
    //  localStorage.setItem('token', token);

    //  setJWTState(token);
    setJWTState("test");
   } 
  }, [setJWTState]);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setJWTState(null);
  }, [setJWTState]);

  const register = useCallback(({ username, password }) => {
    let usuarios = JSON.parse(localStorage.getItem('usuarios'));

    let nuevoUsuario = {
      username: username,
      password: password
     };
     
     const exists = usuarios.some(user => user.username === username && user.password === password);

    if (exists) {
      console.log('El usuario ya existe')
      return;
    } else {
      // Añadir el nuevo usuario al array
      usuarios.push(nuevoUsuario);
      // Guardar el array actualizado en el localStorage
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      setRegistered(true)
      // localStorage.setItem('username', username);
      // localStorage.setItem('password', password);
    }
  });


  return { isLogged: Boolean(jwtState), login, logout, register, registered };
}
