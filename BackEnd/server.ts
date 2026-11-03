import "dotenv/config";
import express from "express";
import { connectToDB } from "./database/sequelize";
import userRouter from "./routes/user";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("API da marmitaria no ar");
});

app.use(userRouter);


async function iniciar() {
    try {
        await connectToDB();

        app.listen(3000, () => console.log("Rodando em http://localhost:3000"));
    } catch (erro) {
        console.error("Não foi possível iniciar a API:", erro);
        process.exit(1);
    }
}

iniciar();