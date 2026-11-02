import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";

export class UserModel extends Model {
	declare id: number;
	declare nome: string;
	declare email: string;
	declare cpf: string;
	declare senha: string;

	public converterParaResposta(): { id: number; nome: string; email: string; cpf: string } {
		return {
			id: this.id,
			nome: this.nome,
			email: this.email,
			cpf: this.cpf
		}
	}
}

UserModel.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		nome: {
			type: DataTypes.STRING(120),
			allowNull: false
		},
		email: {
			type: DataTypes.STRING(160),
			allowNull: false,
			unique: true
		},
		cpf: {
			type: DataTypes.STRING(11),
			allowNull: false,
			unique: true
		},
		senha: {
			type: DataTypes.STRING(60),
			allowNull: false
		}
	},
	{
		sequelize,
		modelName: "User",
		tableName: "usuarios",
		timestamps: true,
	},
)