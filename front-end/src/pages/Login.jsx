//import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { registerRequest } from "../services/auth";
import { useAuth } from "../context/AuthContext";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Card, Message, Button, Input, Label } from "../components/ui";
// import { loginSchema } from "../schemas/auth";

export default function Login() {
  const {register,handleSubmit,formState: { errors }} = useForm();
  const {login,isAuthenticated,errors:loginErrors} = useAuth()
  const navigate = useNavigate()

  useEffect(()=>{
    if (isAuthenticated) navigate("/jugadores");
  },[isAuthenticated])

  const submitLogin = handleSubmit( (body) => {
    login(body)
  });

  return (
    <div className="flex items-center justify-center h-[calc(100vh-100px)]">
       <div className="bg-url('../public/fondo.jpg') mx-auto p-4 bg-green-950 rounded-3xl  border-yellow-950 border-8 bg-cover">
        <ul className="bg-red-700 text-white rounded-md text-center">
          {loginErrors.map((error, i) => (
            <li key={i}>{error}</li> 
          ))}
        </ul>
        <h2 className="text-2xl font-bold uppercase text-center m-2">Login de Autentificacion</h2>
        <form onSubmit={submitLogin} className="bg-green-900 border-hidden">
          <label htmlFor="email:" className="text-md block my-1 text-white">Email:</label>
          <input className="w-full bg-white px-4 py-2 rounded-md text-black"
            type="email"
            name="email"
            placeholder="Escriba su mail..."
            {...register("email", { required: {value:true,message:"Mail es requerido"} })}
          />
          {errors.email && (<p className="text-red-500 font-semibold">{errors.email.message}</p>)}
          <label htmlFor="password" className="text-md block my-1 text-white">Password:</label>
          <input className="w-full bg-white px-4 py-2 rounded-md text-black"
            type="password"
            name="password"
            placeholder="Escriba su password..."
            {...register("password", { required: {value:true,message:"Password es requerido"} })}
          />
           {errors.password && (<p className="text-red-500 font-semibold">{errors.password.message}</p>)}
         
          <button type="submit" 
                  className="bg-green-950 px-4 py-1 rounded-md my-2">Login
          </button>
        </form>

        <p className="flex gap-x-2 justify-between text-white">
          No tienes una cuenta...? <Link to="/register" className="text-green-700 font-bold">Registrarse</Link>
        </p>
       </div> 
    </div>
  );
}
