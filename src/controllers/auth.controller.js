import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {TOKEN_SECRET} from '../config.js';
import User from '../models/user.model.js';

export const register = async (req, res) => {
  try {
    const { nombres, cedula, email, password } = req.body;

    // Verificar si ya existe un usuario con el mismo correo electrónico
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("email existe");
      return res.status(400).json(['Ya existe un usuario con el mismo correo electrónico']);
    }
        const existingUser2 = await User.findOne({ cedula });
        if (existingUser2) {
          console.log("cedula existe");
          return res.status(400).json(['Ya existe un usuario con la misma cedula']);
        }
    

    // Crear un nuevo usuario                                   
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Agregamos nombres y cedula al nuevo usuario
    const newUser = new User({ 
      nombres, 
      cedula, 
      email, 
      password: hashedPassword 
    });
    
    await newUser.save();
    
    // Generar un token de acceso 
    const accessToken = jwt.sign({ userId: newUser._id, name: newUser.nombres }, TOKEN_SECRET);
    
    // Guardar token en la cookie
    res.cookie("token", accessToken);
    
    // Enviar una respuesta al cliente que se guarda en el header de la pagina
    res.status(200).json({
      id: newUser._id,
      email: newUser.email,
      nombres: newUser.nombres, 
      cedula: newUser.cedula    
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(['Ha ocurrido un error al registrar el usuario']);
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("entro a login")
    // Verificar si el correo electrónico y la contraseña son correctos
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json(['Email Invalido']);
  }
                                                  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json(['Password inválido']);
    }

    // Generar un token de acceso
    const accessToken = jwt.sign({ userId: user._id }, TOKEN_SECRET);
    // guardar token en la cookie
    res.cookie("token", accessToken);
 
    //console.log(res)
    // Enviar una respuesta al cliente
    res.status(200).json({
      id: user._id,
      email: user.email,
      nombres:user.nombres,
      cedula:user.cedula
    });
  } catch (error) {
    console.error(error);
    res.status(500).json( ['Ha ocurrido un error al iniciar sesión']);
  }
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.send("error del token");

  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) return res.status(401).json(["Token No valido"]);

    const userFound = await User.findById(user.userId);
    if (!userFound) return res.status(401).json(["Usuario no autorizado"]);

    return res.json({
      id: userFound._id,
      email: userFound.email,
      nombres:userFound.nombres,
      cedula:userFound.cedula
    });
  });
};

export const logout = async (req, res) => {
  res.cookie("token", "", {
    secure: true,
    expires: new Date(0),
  });
  return res.sendStatus(200);
};