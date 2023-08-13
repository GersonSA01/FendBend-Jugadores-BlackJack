import React from "react";
import { Link } from "react-router-dom";

const CartaPresentacion = () => {
  return (
    <div className="contenedorgeneral  py-8  justify-center">
      <div className="carta-presentacion max-w-lg mx-auto bg-black bg-opacity-70 rounded-lg shadow-lg p-8">
        <div className="card2">
          <img
            src="./img/logo doranger.png"
            className="logoprincipal w-40 mx-auto"
            alt=""
          />
          <div className="flex justify-center">
          <img className="w-60" src="../../public/logo doranger.png" alt="Logo" />
          </div>
          <h1 className="text-3xl font-bold text-white text-center mt-4">
            ¡Bienvenido al juego BLACKJACK!
          </h1>
          <div className="mt-4">
            <ul className="text-white">
              <h2 className="font-bold ">Integrantes:</h2>
              <li>Mejia Cordova Dora Margot</li>
              <li>Mendieta Leon Andy Leonel</li>
              <li>Suarez Aguirre Gerson Alexander</li>
              <li>Valdospin Alvarez Angeles Nahomi</li>
            </ul>
            <p className="descripcion mt-4 text-white">
              ¡Descubre la emoción del Blackjack en nuestra página web!
              Sumérgete en el apasionante mundo de este clásico juego de
              cartas, donde la estrategia y la suerte se unen para ofrecerte
              horas de entretenimiento sin igual.
              <br />
              <br />
              ¿Estás listo para desafiar al crupier y alcanzar la victoria en
              el Blackjack? Únete a nosotros en nuestra página web y descubre
              la adrenalina de este clásico juego de cartas. ¡Apuesta, juega y
              gana en nuestro emocionante casino virtual!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartaPresentacion;


