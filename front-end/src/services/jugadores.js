import axios from "./axios";

export const getJugadoresRequest = async () => axios.get("/jugador");

export const createJugadoresRequest = async (jugador) => axios.post("/jugador", jugador);

export const updateJugadoresRequest = async (id,jugador) =>
  axios.put(`/jugador/${id}`, jugador);

export const deleteJugadoresRequest = async (id) => axios.delete(`/jugador/${id}`);

export const getJugadorRequest = async (id) => axios.get(`/jugador/${id}`);
