import { useEffect } from "react";
// import { userAuth } from "../context/AuthContext";
import { JugadorCard } from "../components/jugadores/JugadorCard";
import { ImFileEmpty } from "react-icons/im";
import { useJugadores } from "../context/JugadoresContext";

export default function GetJugadores() {
  const { jugadores, getJugadores } = useJugadores(); 


  useEffect(() => {
    getJugadores();
  }, []);

  return (
    <>
      {jugadores.length === 0 && (
        <div className="flex justify-center items-center p-10">
          <div>
            <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
            <h1 className="font-bold text-xl">
              No existen jugadores ingresados
            </h1>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {jugadores.map((jugador) => (
          <JugadorCard jugador={jugador} key={jugador._id} />
        ))}
      </div>
    </>
  );
}