import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
	dialect: "mysql",
	database: process.env.DB_NAME || "marmitariabd",
	username: process.env.DB_USER || "admin",
	password: process.env.DB_PASSWORD || "1707",
	host: process.env.DB_HOST || "localhost",
	port: Number(process.env.DB_PORT) || 3306,
});

export async function connectToDB() {
	try {
		await sequelize.authenticate();

		console.log("Conectado ao banco de dados com sucesso")

		await sequelize.sync();

		console.log("Tabelas sincronizadas com sucesso");

	} catch (error) {
		console.error("Erro ao conectar ao banco de dados:", error)
	}
}