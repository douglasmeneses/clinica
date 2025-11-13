import express from "express";
import cors from "cors";
import "dotenv/config";
import routes from "./routes";
import { setupSwagger } from "./swagger";

const app = express();

// Configuração CORS - permite requisições do frontend
app.use(
  cors({
    origin: "http://localhost:5173", // URL do frontend
    credentials: true,
  })
);

app.use(express.json());

setupSwagger(app);

app.use("", routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
