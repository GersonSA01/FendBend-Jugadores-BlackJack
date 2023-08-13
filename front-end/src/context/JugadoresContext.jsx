import { createContext, useContext, useState } from "react";
import {
createJugadoresRequest,
deleteJugadoresRequest,
getJugadoresRequest,
getJugadorRequest,
updateJugadoresRequest,
} from "../services/jugadores";

const JugadorContext = createContext();

export const useJugadores = () => {
  const context = useContext(JugadorContext);
  if (!context) throw new Error("useJugadores sin Contexto");
  return context;
};

export function JugadorProvider({ children }) {
  const [jugadores, setJugadores] = useState([]);

  const getJugadores = async () => {
    const res = await getJugadoresRequest();
    console.log(res.data)
    setJugadores(res.data);
  };

  const deleteJugador = async (id) => {
    try {
      const res = await deleteJugadoresRequest(id);
      if (res.status === 204) setJugadores(jugadores.filter((jugador) => jugador._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const createJugador = async (jugador) => {
    try {
      const res = await createJugadoresRequest(jugador);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getJugador= async (id) => {
    try {
      const res = await getJugadorRequest(id);
      console.log(res)
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateJugador = async (id, jugador) => {
    try {
      await updateJugadoresRequest(id, jugador);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <JugadorContext.Provider
      value={{
        jugadores,
        getJugadores,
        deleteJugador,
        createJugador,
        getJugador,
        updateJugador,
      }}
    >
      {children}
    </JugadorContext.Provider>
  );
}