import React from "react";
import MesaJuego from "../components/MesaJuego"

const Juego = () => {
  return (
    <div className='bg-[url("../public/fondo.jpg")] mx-auto p-4 bg-green-800 rounded-l-full rounded-r-full border-yellow-950 border-8 bg-cover '>
      <MesaJuego />
    </div>
  );
};

export default Juego;
