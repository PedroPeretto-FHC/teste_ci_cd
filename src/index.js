import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import router from "./routes/routes.js";
import { initTable } from "./controllers/userController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

app.use(express.static(path.join(__dirname, "../public")));

const PORT = 3000;

app.listen(PORT, async () => {
    await initTable();
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});