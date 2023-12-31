import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import jugadorRoutes from "./routes/jugador.routes.js";
import authRoutes from './routes/auth.routes.js';
const app = express();
// llamar a los middlewares
// para establecer el dominio del backend y las cokkies
//app.use(cors());//permite conectarse con diferentes servidores
app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
}));//permite conectarse con diferentes servidores
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.json("Pagina Principal")
})
// rutas autentitificacion y estudiante
app.use('/api/auth', authRoutes);
app.use("/api/jugador", jugadorRoutes);
export default app;