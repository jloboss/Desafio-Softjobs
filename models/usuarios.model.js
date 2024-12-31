import { pool } from "../database/connection.js";
import format from "pg-format";

const getUsuarios = async (email) => {
  const query = format("SELECT * FROM usuarios WHERE email = %L", email);
  const { rows } = await pool.query(query);
  return rows;
};

const register = async (newUser) => {
  const query =
    "INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4) RETURNING *";
  const { rows, rowCount } = await pool.query(query, [
    newUser.email,
    newUser.password,
    newUser.rol,
    newUser.lenguage,
  ]);
  if (rowCount === 0) {
    throw new Error("No se pudo registrar el usuario");
  }
  return rows[0];
};

const validateUser = async (email) => {
  const query = format("SELECT * FROM usuarios WHERE email = %L", email);
  const { rows, rowCount } = await pool.query(query);
  if (!rowCount) {
    throw new Error("Usuario no encontrado");
  }
  return rows[0]; // Retorna el primer usuario encontrado
};

const usuariosModel = {
  register,
  getUsuarios,
  validateUser,
};
export default usuariosModel;
