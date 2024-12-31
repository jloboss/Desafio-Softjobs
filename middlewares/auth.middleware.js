import jwt from "jsonwebtoken";

const verifyJWT = (req, res, next) => {
  try {
    //Verifica que el header tenga un token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Token no proporcionado o formato inválido" });
    }

    //extraer el token
    const token = authHeader.split("Bearer ")[1];

    //Verificar el token
    const { email } = jwt.verify(token, "this_is_a_secret");

    //Agregar el email al request
    req.user = { email };

    //Continuar con el siguiente middleware
    next();
  } catch (error) {
    console.error(error);
    // Manejo específico del error JWT
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Token inválido o mal formado" });
    }

    // Manejo para otros errores
    return res.status(500).json({ message: "Ocurrió un error en el servidor" });
  }
};
const authMiddleware = {
  verifyJWT,
};
export default authMiddleware;
