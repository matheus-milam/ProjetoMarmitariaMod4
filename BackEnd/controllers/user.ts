import { Request, Response } from "express";
import { User } from "../entities/user";
import { UserModel } from "../entities/usermodel";

export async function cadastrarUsuario(req: Request, res: Response) {
	let usuario: User;

	// Erros de validação (CPF, e-mail, senha, nome) caem aqui: 400
	try {
		usuario = await User.cadastrar(req.body);
	} catch (erro) {
		return res.status(400).json({ erro: (erro as Error).message });
	}

	// Erros do banco ou do servidor caem aqui: 500
	try {
		const emailExistente = await UserModel.findOne({ where: { email: usuario.email } });
		if (emailExistente) {
			return res.status(409).json({ erro: "E-mail já cadastrado" });
		}

		const cpfExistente = await UserModel.findOne({ where: { cpf: usuario.cpf } });
		if (cpfExistente) {
			return res.status(409).json({ erro: "CPF já cadastrado" });
		}

		const criado = await UserModel.create(usuario.paraPersistencia());
		return res.status(201).json(criado.converterParaResposta());
	} catch (erro) {
		console.error(erro);
		return res.status(500).json({ erro: "Erro interno do servidor" });
	}
}