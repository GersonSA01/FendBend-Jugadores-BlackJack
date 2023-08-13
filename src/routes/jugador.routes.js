import { Router } from "express";
import {
  createJugador,
  deleteJugador,
  getJugador,
  getJugadores,
  updateJugador,
} from "../controllers/jugador.controllers.js";

import authenticateToken from "../middlewares/auth.token.js";
import { createJugadorSchema } from "../schemas/jugador.schema.js";
import { validateSchema } from "../middlewares/validator.middleware.js";

const router = Router();

router.get("/",authenticateToken, getJugadores);
//router.get("/",getStudents);

router.post("/",authenticateToken,validateSchema(createJugadorSchema), createJugador);

router.get("/:id", authenticateToken, getJugador);

router.put("/:id", authenticateToken, updateJugador);

router.delete("/:id", authenticateToken, deleteJugador);

export default router;