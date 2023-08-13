import { z } from "zod";

export const createJugadorSchema = z.object({
  nombres: z.string({ required_error: "Nombre es requerido" }),
  telefono: z.string({ required_error: "Teléfono es requerido" }),
  correo: z.string({
    required_error: "Correo es requerido",
    validate: (value) => {
      if (!value.includes("@")) {
        return "Correo debe tener @";
      }
      return null;
    },
  }),
});