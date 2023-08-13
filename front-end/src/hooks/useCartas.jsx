import { useState, useEffect } from "react";

const useCartas = () => {
  const [turnoCrupier, setTurnoCrupier] = useState(false);
  const [ganador, setGanador] = useState(null);
  const [baraja, setBaraja] = useState("");
  const [cartasJugador, setCartasJugador] = useState([]);
  const [cartasCrupier, setCartasCrupier] = useState([]);
  const [sumaCarta, setSumaCarta] = useState(0);
  const [sumaCartaC, setSumaCartaC] = useState(0);
  const [juegoIniciado, setJuegoIniciado] = useState(false);
  const [ganadasComputadora, setGanadasComputadora] = useState(0);
  const [ganadasJugador, setGanadasJugador] = useState(0);
  const [empates, setEmpates] = useState(0);
  const [totalJuegos, setTotalJuegos] = useState(0);

  const convertirValor = (valor) => {
    return valor === "ACE" ? 1 : valor === "JACK" || valor === "QUEEN" || valor === "KING" ? 10 : parseInt(valor);
  };

  const iniciarTurnoCrupier = () => {
    setTurnoCrupier(true);
}
  const obtenerCarta = (deckId) => {
    if (cartasJugador.length >= 6) {
      alert("¡Ya has sacado el máximo de  cartas!");
      return;
    }
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        const carta = data.cards[0];
        const valor = convertirValor(carta.value);
        setSumaCarta(prevSumaCarta => prevSumaCarta + valor);
        setCartasJugador(prevCartas => [...prevCartas, carta.image]);
      })
      .catch(function (err) {
        console.log("Error: ", err);
      });
  };

  const obtenerNuevaBaraja = () => {
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
      .then(response => response.json())
      .then(data => {
        setBaraja(data.deck_id);
      })
      .catch(err => {
        console.log("Error: ", err);
      });
  };
  
  useEffect(() => {
    obtenerNuevaBaraja();
  }, []);

  const empezar = () => {
    fetch(`https://deckofcardsapi.com/api/deck/${baraja}/draw/?count=2`)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        const cartas = data.cards;
        let sumaInicial = 0;
        cartas.forEach((carta) => {
          const valor = convertirValor(carta.value);
          sumaInicial += valor;
        });
        setSumaCarta(sumaInicial);
        setCartasJugador(cartas.map((carta) => carta.image));
        setJuegoIniciado(true);
      })
      .catch(function (err) {
        console.log("Error: ", err);
      });
  };

  
const Crupier = () => {
  fetch(`https://deckofcardsapi.com/api/deck/${baraja}/draw/?count=1`)
      .then(response => response.json())
      .then(data => {
          const carta = data.cards[0];
          const valor = convertirValor(carta.value);

          setSumaCartaC(prevSumaCartaC => prevSumaCartaC + valor);
          setCartasCrupier(prevCartas => [...prevCartas, carta.image]);
      })
      .catch(err => {
          console.log("Error: ", err);
      });
}

useEffect(() => {
  if (turnoCrupier && sumaCartaC < 17) {
      Crupier();
  }
}, [sumaCartaC, turnoCrupier]);

useEffect(() => {
  if (turnoCrupier && sumaCartaC >= 17) {
      validarGanador();
  }
}, [sumaCartaC, turnoCrupier]);


const validarGanador = () => {
  setTotalJuegos(prevTotal => prevTotal + 1); 

  if (sumaCarta > 21 && sumaCartaC > 21) {
    setGanador("empate");
  } else if (sumaCarta === sumaCartaC) {
    setGanador("empate");
    setEmpates(prevCount => prevCount + 1);
  } else if (sumaCarta > 21 || (sumaCarta < sumaCartaC && sumaCartaC <= 21)) {
    setGanador("crupier");
    setGanadasComputadora(prevCount => prevCount + 1);
  } else {
    setGanador("jugador");
    setGanadasJugador(prevCount => prevCount + 1);
  }
};


const reiniciarEstadisticas = () => {
  setGanadasComputadora(0);
  setGanadasJugador(0);
  setEmpates(0);
  setTotalJuegos(0);
};  

const reiniciarJuego = () => {
  setTurnoCrupier(false);
  setGanador(null);
  setBaraja("");
  setCartasJugador([]);
  setCartasCrupier([]);
  setSumaCarta(0);
  setSumaCartaC(0);
  setJuegoIniciado(false);
  obtenerNuevaBaraja();
}


return { 
  baraja, 
  cartasJugador, 
  cartasCrupier, 
  sumaCarta, 
  sumaCartaC, 
  juegoIniciado, 
  empezar, 
  obtenerCarta, 
  Crupier, 
  iniciarTurnoCrupier, 
  ganador,
  ganadasComputadora,
  ganadasJugador,
  empates,
  totalJuegos,
  reiniciarJuego,
  reiniciarEstadisticas
};

};

export default useCartas;