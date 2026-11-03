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

export async function listarUsuarios(req: Request, res: Response) {
	try {
		const pagina = Math.max(Number(req.query.pagina) || 1, 1);
		const limite = Math.min(Math.max(Number(req.query.limite) || 10, 1), 100);

		const { count, rows } = await UserModel.findAndCountAll({
			limit: limite,
			offset: (pagina - 1) * limite,
			order: [["id", "ASC"]],
		});

		return res.json({
			dados: rows.map((usuario) => usuario.converterParaResposta()),
			pagina,
			limite,
			total: count,
			totalPaginas: Math.ceil(count / limite),
		});
	} catch (erro) {
		console.error(erro);
		return res.status(500).json({ erro: "Erro interno do servidor" });
	}
}

export async function buscarUsuarioPorId(req: Request, res: Response) {
	try {
		const usuario = await UserModel.findByPk(Number(req.params.id));
		if (!usuario) {
			return res.status(404).json({ erro: "Usuário não encontrado" });
		}
		return res.json(usuario.converterParaResposta());
	} catch (erro) {
		console.error(erro);
		return res.status(500).json({ erro: "Erro interno do servidor" });
	}
}