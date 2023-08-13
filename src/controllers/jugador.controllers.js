import Jugador from "../models/jugador.model.js";

export const getJugadores = async (req, res) => {
    //res.send("todos los jugadores")
    const Jugadores = await Jugador.find({user: req.user.userId}).populate();
    console.log(Jugadores)
    res.status(200).json(Jugadores)
    
};

export const createJugador = async (req, res) => {
  try {
     const { nombres,telefono,correo } = req.body;
    // Verificar si ya existe un usuario con el mismo correo electrónico
    const existingJuga = await Jugador.findOne({ nombres });
    if (existingJuga) {
      return res.status(400).json({ message: 'Ya existe un registro con el mismo nombres' });
    }
    console.log(req.body)
    const jugador = new Jugador({
      nombres,
      telefono,
      correo,
      user: req.user.userId
    });
    console.log(jugador)
    const jugadorOk= await jugador.save();

    // Enviar una respuesta al cliente
    res.status(200).json({"status":"registro ingresado ok",jugadorOk});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al insertar" });
  }
};

export const deleteJugador = async (req, res) => {
  try {
    const { id } = req.params;
     // Busca un jugador por su ID y sui lo encuebtra lo elimina
    const jugador = await Jugador.findByIdAndDelete(id) ;
    if (!jugador) {
      return res.status(404).json({ message: 'Jugador no encontrado' });
    }
    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ha ocurrido un error al eliminar el jugador' });
  }
};

export const updateJugador = async (req, res) => {
     try {
    const { id } = req.params;
    const { nombres, telefono,correo } = req.body;

    // Buscar un jugador por su ID en la base de datos
    const jugador = await Jugador.findById(id);
    if (!jugador) {
      return res.status(404).json({ message: 'Jugador no encontrado' });
    }
    // Actualizar el los datos del jugador
    jugador.nombres = nombres;
    jugador.telefono = telefono;
    jugador.correo = correo;
    await jugador.save();

    // Enviar una respuesta al cliente
    res.status(200).json({"status":"registro actualizado ok",jugador});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ha ocurrido un error al actualizar el jugador' });
  }
};

export const getJugador = async (req, res) => {
    try {
    const { id } = req.params;
    // Buscar un usuario por su ID en la base de datos
    const jugador = await Jugador.findById(id);
    if (!jugador) {
      return res.status(404).json({ message: 'Jugador no encontrado' });
    }
    // Enviar una respuesta al cliente
    res.status(200).json(jugador);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error al obtener el Jugador' });
    }
};