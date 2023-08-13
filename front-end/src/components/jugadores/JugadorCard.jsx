import { useJugadores } from "../../context/JugadoresContext"; 
import { Button, ButtonLink, Card } from "../ui";

export function JugadorCard({ jugador }) {
  const { deleteJugador } = useJugadores();

  return (
    <Card>
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{jugador.nombres}</h1>
        <div className="flex gap-x-2 items-center">
          <Button onClick={() => deleteJugador(jugador._id)}>Delete</Button>
          <ButtonLink to={`/jugador/${jugador._id}`}>Edit</ButtonLink>
        </div>
      </header>
      <p className="text-slate-300"><span className="text-blue-400 font-bold">Telefono:</span> {jugador.telefono}</p>
      <p className="text-slate-300"><span className="text-blue-400 font-bold">Correo:</span>{jugador.correo}</p>
     
    </Card>
  );
}