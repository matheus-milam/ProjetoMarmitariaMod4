import { Router } from "express";
import { cadastrarUsuario } from "../controllers/user";

const usuarioRouter = Router();

usuarioRouter.post("/usuarios", cadastrarUsuario);

export default usuarioRouter;