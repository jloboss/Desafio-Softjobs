import { Router } from "express";
import usuariosController from "../controllers/usuarios.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const router = Router();

router.get(
  "/usuarios",
  authMiddleware.verifyJWT,
  usuariosController.getUsuario
);
router.post("/usuarios", usuariosController.register);
router.post("/login", usuariosController.login);

export default router;
