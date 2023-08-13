import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Input, Label } from "../components/ui";
import { useJugadores } from "../context/JugadoresContext";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

export default function FormJugadores() {
  const { createJugador, getJugador, updateJugador } = useJugadores();
  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      if (params.id) {
        updateJugador(params.id, {
          ...data,
          telefono:data.telefono,
          correo:data.correo,
          date: dayjs.utc(data.date).format(),
        });
      } else {
        console.log("al grabar:",data)
        createJugador({
          ...data,
          telefono:data.telefono,
          correo:data.correo,
          date: dayjs.utc(data.date).format(),
        });
      }

      navigate("/jugadores");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(params.id)
    const loadJugador= async () => {
      if (params.id) {
        const jugador = await getJugador(params.id);
        setValue("nombres", jugador.nombres);
        setValue("telefono", jugador.telefono);
        setValue("correo", jugador.correo);
        
      }
    };
    loadJugador();
  }, []);

  return (
     <Card>
       
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="nombres">Nombre</Label>
        <Input
          type="text"
          name="nombres"
          placeholder="Ingrese nombres"
          {...register("nombres",{ 
            required: {value:true,message:"Nombres son requeridos"},pattern:{value:/^[A-Za-z\s]+$/i,message:"Solo ingrese letras"}  })}


          
          autoFocus
        />
        {errors.nombres && (
          <p className="text-red-500 font-semibold">{errors.nombres.message}</p>
        )}
        <Label htmlFor="telefono">telefono:</Label>
         <Input 
            type="text"
            name="telefono"
            placeholder="Escriba el telefono..."
            {...register("telefono", { required: {value:true,message:"Telefono es requerido"} ,
            pattern:{value:/^[0-9]{10}$/,message:"Solo 10 numeros"}})}
          />
          {errors.telefono && (<p className="text-red-500 font-semibold">{errors.telefono.message}</p>)}
         <Label htmlFor="correo">correo:</Label>
          <Input 
            type="email"
            name="correo"
            placeholder="Escriba el correo..."
            {...register("correo", { required: {value:true,message:"Correo es requerido"} })}
          />
          {errors.correo && (<p className="text-red-500 font-semibold">{errors.correo.message}</p>)}
          
        <Button>Guardar datos</Button>
      </form>
    </Card>
     );
}