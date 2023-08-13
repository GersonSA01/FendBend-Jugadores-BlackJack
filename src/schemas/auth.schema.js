import { z } from "zod";

export const registerSchema = z.object({
  nombres: z.string({ required_error: "Nombres son requeridos" })
           .regex(/^[a-zA-Z\s]+$/, { message: "El nombre debe contener solo letras y espacios" }),
  cedula: z.string({ required_error: "Cédula es requerida" })
          .regex(/^[0-9]+$/, { message: "Cédula debe ser solo números" })
          .length(10, { message: "Cédula debe tener exactamente 10 dígitos" }),
  email: z.string({ required_error: "Email is requerido" })
        .email({ message: "Email no es valido" }),
  password: z.string({ required_error: "Password is requerido" })
           .min(7, { message: "Password mínimo 7 caracteres" }),
});



export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
});