import { Router } from "express";
import { cadastrarUsuario, listarUsuarios, buscarUsuarioPorId } from "../controllers/user";

const usuarioRouter = Router();

usuarioRouter.post("/usuarios", cadastrarUsuario);
usuarioRouter.get("/usuarios", listarUsuarios);
usuarioRouter.get("/usuarios/:id", buscarUsuarioPorId);

export default usuarioRouter;