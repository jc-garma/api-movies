import React, { useState } from "react";

// 1. Crear el contexto
export const Context = React.createContext({});

// 2. Crear el provider, para proveer el contexto a los componentes
export function UserContextProvider({ children }) {
  // 3. Prop token web javascript
  // const [jwt, setJWT] = useState(null);
  // favoritos
  const [favourites, setFavourites] = useState([]);

  const [jwtState, setJWTState] = useState(null);
  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  localStorage.setItem('usuarios', JSON.stringify(usuarios));

  // 4. Proveer el contexto. Todo lo que envuelve lo que le pasemos como children. En este caso un objeto
  return (
    <Context.Provider
      value={{
        jwtState,
        setJWTState,
        favourites, 
        setFavourites,
      }}
    >
      {children}
    </Context.Provider>
  );
}
