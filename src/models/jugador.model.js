import mongoose from "mongoose";

const jugadorSchema = new mongoose.Schema(
   {
     nombres: { type: String, required: true, unique: true },
     telefono: { type: String, required: true },
     correo: { type: String, required: true  },
     fecha: {type: Date, default: Date.now },
     user: {type: mongoose.Types.ObjectId, ref: "User"},
   },
   {
    timestamps: true,
   }
    
);

export default mongoose.model("jugador", jugadorSchema);