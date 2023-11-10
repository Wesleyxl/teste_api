import { Router } from "express";

import AuthController from "../app/controller/AuthController";
import Auth from "../app/middleware/Auth";

const route = Router();

route.get("/test", (req, res) => {
  res.json("Hello World");
});

route.post("/auth/login", AuthController.login);
route.post("/auth/esqueceu-senha", AuthController.esqueceuSenha);
route.post("/auth/mudar-senha", Auth, AuthController.mudarSenha);
route.post("/auth/gerar-senha-provisoria", AuthController.gerarSenhaProvisoria);

route.get("/teste/ativo", Auth, (req, res) => {
  res.json("logado");
});

export default route;
