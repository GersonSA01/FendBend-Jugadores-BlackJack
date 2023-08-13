import { UserCard } from "../components/jugadores/UserCard";
import { useAuth } from "../context/AuthContext";

export default function GetJugadores() {
  const { user } = useAuth();


  return (
    <>
      <div className="gap-2">
      <UserCard user={user} key={user._id} />
      </div>
    </>
  );
}