import "dotenv/config";
import cors from "cors";
import express from "express";
import { sequelize } from "./config/database.js";
import guitarRoutes from "./routes/guitarRoutes.js";

const app = express();
const port = Number(process.env.PORT || 3008);
const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(cors({ origin: allowedOrigin }));
app.use(express.json());

app.get("/api/health", (_request, response) => {
    response.json({ status: "ok" });
});

app.use("/api/guitars", guitarRoutes);

app.use((error, _request, response, _next) => {
    console.error("Error en la API:", error);
    response.status(500).json({ message: "Error interno del servidor" });
});

try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(port, () => {
        console.log(`GuitarsLA API escuchando en http://localhost:${port}`);
    });
} catch (error) {
    console.error("No se pudo iniciar el servidor:", error);
    process.exitCode = 1;
}
