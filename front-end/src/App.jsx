import { BrowserRouter, Route, Routes } from "react-router-dom"
import GetJugadores from "./pages/GetJugadores"
import GetUsers from "./pages/GetUsers"
import Login from "./pages/Login"
import {Navbar} from "./components/Navbar"
import { Authprovider } from "./context/AuthContext.jsx"
import Register from "./pages/Register.jsx"
import FormJugadores from "./pages/FormJugadores.jsx"
import ProtectedRoute from "./ProtectedRoute.jsx"
import { JugadorProvider } from "./context/JugadoresContext.jsx"
import Juego from "./pages/Juego.jsx"
import CartaPresentacion from "./pages/Presentacion.jsx"

function App() {
  return (
   <Authprovider> 
     <JugadorProvider>
      <BrowserRouter>
       <main className="container content-container px-10 md:px-0">
        <Navbar />
        <div className="ml-48">
        <Routes>
          <Route path="/" element={<CartaPresentacion/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route element={<ProtectedRoute/>}>
            <Route path="/jugadores" element={<GetJugadores/>}/>
            <Route path="/perfil/" element={<GetUsers/>} />
            <Route path="/add-jugador" element={<FormJugadores/>}/>
            <Route path="/jugador/:id" element={<FormJugadores/>} />
            <Route path="/casino/" element={<Juego/>} />
          </Route>
        </Routes>
          
        </div>

       </main> 
      </BrowserRouter>
     </JugadorProvider> 
   </Authprovider> 
 )
}

export default App
