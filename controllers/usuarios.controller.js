import usuariosModel from "../models/usuarios.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// const getUsuarios = async (req, res) => {
//   const usuarios = await usuariosModel.getUsuarios();
//   res.json(usuarios);
//   console.log("access");
// };

const getUsuario = async (req, res) => {
  try {
    const email = req.user.email; // El email proviene del middleware
    const usuario = await usuariosModel.getUsuarios(email);
    res.json(usuario);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Ocurrió un error al obtener el usuario" });
  }
};
const register = async (req, res) => {
  try {
    const newUser = {
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      rol: req.body.rol,
      lenguage: req.body.lenguage,
    };
    const data = await usuariosModel.register(newUser);
    return res.json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error en el body");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const data = await usuariosModel.validateUser(email);
    // Comparar contraseñas
    const isMatch = await bcrypt.compareSync(password, data.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Usuario o contraseña incorrectos" });
    }

    // JWT
    const token = jwt.sign({ email }, "this_is_a_secret");

    res.json({
      message: "Usuario logeado",
      usuario: data,
      token,
    });
  } catch (error) {
    return res.status(500).json({ code: error.code, message: error.message });
  }
};

const usuariosController = {
  register,
  getUsuario,
  login,
};
export default usuariosController;
