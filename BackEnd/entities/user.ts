import bcrypt from "bcryptjs";
import { cpfValido, somenteNumeros } from "../validators/cpf";
import { emailValido } from "../validators/email";
import { errosDaSenha } from "../validators/senha";

type DadosCadastro = { nome: string; email: string; cpf: string; senha: string };

export class User {
	private _nome: string = "";
	private _email: string = "";
	private _cpf: string = "";
	private readonly senhaHash: string;

	constructor(nome: string, email: string, cpf: string, senhaHash: string) {
		this.nome = nome;
		this.email = email;
		this.cpf = cpf;
		this.senhaHash = senhaHash;
	}

	static async cadastrar(dados?: Partial<DadosCadastro>) {
		const { nome, email, cpf, senha }: Partial<DadosCadastro> = dados ?? {};

		if (!nome || !email || !cpf || !senha) {
			throw new Error("Nome, e-mail, CPF e senha são obrigatórios");
		}

		const erros = errosDaSenha(String(senha));
		if (erros.length > 0) throw new Error(erros.join("; "));

		const senhaHash = await bcrypt.hash(String(senha), 10);
		return new User(nome, email, cpf, senhaHash);
	}

	get nome(): string {
		return this._nome;
	}
	set nome(valor: string) {
		const nome = String(valor ?? "").trim();
		if (nome.length < 3) throw new Error("O nome deve ter no mínimo 3 caracteres");
		this._nome = nome;
	}

	get email(): string {
		return this._email;
	}
	set email(valor: string) {
		const email = String(valor ?? "").trim().toLowerCase();
		if (!emailValido(email)) throw new Error("E-mail inválido");
		this._email = email;
	}

	get cpf(): string {
		return this._cpf;
	}
	set cpf(valor: string) {
		if (!cpfValido(String(valor ?? ""))) throw new Error("CPF inválido");
		this._cpf = somenteNumeros(valor);
	}

	paraPersistencia() {
		return { nome: this._nome, email: this._email, cpf: this._cpf, senha: this.senhaHash };
	}
}