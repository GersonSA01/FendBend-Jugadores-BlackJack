import React from "react";
import useCartas from "../hooks/useCartas";
const GANADOR_GIF = "../../public/black jack!!!.gif";
const CRUPIER_GIF = "../../public/cuando gane la pc.gif";
const EMPATE_GIF = "../../public/no hay ganador.gif";

const MesaJuego = () => {
  const {
    baraja,
    cartasJugador,
    cartasCrupier,
    sumaCarta,
    sumaCartaC,
    juegoIniciado,
    empezar,
    obtenerCarta,
    iniciarTurnoCrupier,
    ganador,
    ganadasComputadora,
    ganadasJugador,
    empates,
    totalJuegos,
    reiniciarJuego,
    reiniciarEstadisticas
  } = useCartas();

  return (
    
    <div className="flex flex-col items-center justify-center">
      {!juegoIniciado ? (
        <div>
          <button
            className="m-4 p-2 bg-casino-gold text-casino-dark text-4xl font-bold rounded-lg shadow-lg transform hover:scale-105 transition-transform"
            onClick={empezar}
          >
            Empezar
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          {!ganador ? (
            <>
              <button
                className="m-4 p-2 bg-gradient-to-r from-green-500 to-green-700 text-white text-4xl rounded-2xl font-bold"
                onClick={() => obtenerCarta(baraja)}
              >
                Sacar Carta
              </button>
              <button
                className="m-4 p-2 bg-gradient-to-r from-red-500 to-red-800 text-white text-4xl rounded-2xl w-48 font-bold"
                onClick={iniciarTurnoCrupier}
              >
                Parar
              </button>
            </>
          ) : (
            <button
              className="m-4 p-2 bg-casino-gold text-casino-dark text-4xl font-bold rounded-lg shadow-lg transform hover:scale-105 transition-transform"
              onClick={reiniciarJuego}
            >
              Reiniciar
            </button>
          )}

          <div className="flex flex-col space-y-16">
            <div className="flex justify-center">
              {cartasJugador.map((imagenCarta, index) => (
                <img
                  key={index}
                  src={imagenCarta}
                  alt={`Carta ${index + 1}`}
                  style={{ width: "100px", margin: "5px" }}
                />
              ))}
            </div>

            <div className="flex justify-center">
              {cartasCrupier.map((imagenCarta, index) => (
                <img
                  key={index}
                  src={imagenCarta}
                  alt={`Carta ${index + 1}`}
                  style={{ width: "100px", margin: "5px" }}
                />
              ))}
            </div>
          </div>
          <p className="text-4xl font-bold text-blue-500">
            Suma del Jugador: <span className="text-cyan-500">{sumaCarta}</span>
          </p>
          <p className="text-4xl font-bold text-blue-500">
            Suma del Crupier: <span className="text-cyan-500">{sumaCartaC}</span>
          </p>
          {ganador && (
            <div className="flex flex-col items-center mt-10">
              {ganador === "jugador" && (
                <div className="flex flex-col items-center space-y-4">
                  <p className="text-5xl font-bold text-green-500">
                  🥳 ¡Felicidades! Ganaste 🥳
                  </p>
                  <img className="shadow-lg" src={GANADOR_GIF} alt="Ganador GIF" />
                </div>
              )}
              {ganador === "crupier" && (
                <div className="flex flex-col items-center space-y-4">
                  <p className="text-5xl font-bold text-red-500">
                  😥 Perdiste contra el crupier 😥
                  </p>
                  <img className="shadow-lg" src={CRUPIER_GIF} alt="Crupier GIF" />
                </div>
              )}
              {ganador === "empate" && (
                <div className="flex flex-col items-center space-y-4">
                  <p className="text-5xl font-bold text-yellow-500">😒 No hay Ganador 😒</p>
                  <img className="shadow-lg" src={EMPATE_GIF} alt="Empate GIF" />
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div>
        
      </div>

      <div>
        <div className="flex justify-center">
        <h2 className="text-2xl font-bold m-5 text-white">Estadísticas</h2>
        </div>
              <table className="border-collapse border border-green-600 mx-auto bg-white">
                <thead>
                  <tr>
                    <th className="border border-green-600 px-4 py-2 bg-green-500 text-white">
                      Ganadas Computadora
                    </th>
                    <th className="border border-green-600 px-4 py-2 bg-green-500 text-white">
                      Ganadas Jugador
                    </th>
                    <th className="border border-green-600 px-4 py-2 bg-green-500 text-white">
                      Empates
                    </th>
                    <th className="border border-green-600 px-4 py-2 bg-green-500 text-white">
                      Total de Juegos
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-green-600 px-4 py-2">
                      <span className="text-black">{ganadasComputadora}</span>
                    </td>
                    <td className="border border-green-600 px-4 py-2">
                      <span className="text-black">{ganadasJugador}</span>
                    </td>
                    <td className="border border-green-600 px-4 py-2">
                      <span className="text-black">{empates}</span>
                    </td>
                    <td className="border border-green-600 px-4 py-2">
                      <span className="text-black">{totalJuegos}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="flex justify-center">
              <button
                className="m-4 p-2 bg-casino-gold text-casino-dark text-4xl font-bold rounded-lg shadow-lg transform hover:scale-105 transition-transform"
                onClick={reiniciarEstadisticas}
              >
                Reiniciar Estadísticas
              </button>                
              </div>

            </div>
    </div>
  );
};

export default MesaJuego;