import express from "express";
import "dotenv/config";
import cors from "cors";

import usuariosRoute from "./routes/usuarios.route.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);

app.use("/", usuariosRoute);
