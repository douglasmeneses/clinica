import { Router } from "express";
import secretarioRoutes from "./secretarioRoutes";
import pacienteRoutes from "./pacienteRoutes";
import medicoRoutes from "./medicoRoutes";
import consultaRoutes from "./consultaRoutes";
import autenticacaoRoutes from "./autenticacaoRoutes";

const routes = Router();

routes.use(secretarioRoutes);
routes.use(pacienteRoutes);
routes.use(medicoRoutes);
routes.use(consultaRoutes);
routes.use(autenticacaoRoutes);

export default routes;
