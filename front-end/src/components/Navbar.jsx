import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ButtonLink } from "./ui/ButtonLink";
import Juego from "../pages/Juego";

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  console.log(isAuthenticated, user)

  return (
    <nav className="bg-gradient-to-r from-slate-900 to-slate-700 flex justify-between align-middle px-10  rounded-lg h-28 w-screen">
      <div className="text-2xl font-bold">
        <Link to={isAuthenticated ? "/jugadores" : "/"}>
          <div className="w-32 flex items-center">
          <img src="../../../public/logo doranger.png" alt="Logo" className="w" />
          <h1>JUGADORES</h1>
          </div>
          </Link>
      </div>
      <ul className="flex gap-x-10 justify-center items-center">
        {isAuthenticated ? (
          <>
              <ButtonLink to="/perfil">Ver Perfil: {user.nombres}</ButtonLink>

            <li>
              <ButtonLink to="/add-jugador">Ingresar Jugador</ButtonLink>
            </li>
            <li>
            <ButtonLink to="/casino/" onClick={Juego}>
                Casino
              </ButtonLink>
            </li>

            <li>
              <Link className="bg-red-900 px-4 py-1 rounded-md" to="/" onClick={() => logout()}>
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <ButtonLink to="/login">Login</ButtonLink>
            </li>
            <li>
              <ButtonLink to="/register">Register</ButtonLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
