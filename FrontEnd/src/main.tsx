import { useState, type FormEvent } from "react";
import { createRoot } from "react-dom/client";
import { cpfValido } from "./cpf";
import "./style.css";

function Cadastro() {
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function cadastrar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    if (enviando) return;

    const campos = new FormData(evento.currentTarget);
    const nome = String(campos.get("nome")).trim();
    const email = String(campos.get("email")).trim();
    const cpf = String(campos.get("cpf")).trim().replace(/[.\-]/g, "");
    const senha = String(campos.get("senha"));
    const confirmacao = String(campos.get("confirmacao"));

    if (!nome || !email || !cpf || !senha || !confirmacao) {
      return setErro("Preencha todos os campos.");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return setErro("Informe um e-mail válido.");
    }
    if (!cpfValido(cpf)) return setErro("Informe um CPF válido.");
    if (senha !== confirmacao) return setErro("As senhas precisam ser iguais.");

    setErro("");
    setEnviando(true);
    try {
      const resposta = await fetch("/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha, cpf }),
      });

      if (resposta.status === 201) {
        window.location.assign("/login/");
        return;
      }

      const dados = await resposta.json().catch(() => null);
      setErro(typeof dados?.erro === "string" ? dados.erro : "Não foi possível cadastrar. Tente novamente.");
    } catch {
      setErro("Não foi possível conectar à API. Tente novamente.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <main>
      <p>Marmitaria</p>
      <h1>Crie sua conta</h1>
      <form onSubmit={cadastrar} noValidate>
        <label>Nome<input name="nome" autoComplete="name" required /></label>
        <label>E-mail<input name="email" type="email" autoComplete="email" required /></label>
        <label>CPF<input name="cpf" inputMode="numeric" placeholder="000.000.000-00" required /></label>
        <label>
          Senha
          <input name="senha" type="password" autoComplete="new-password" aria-describedby="regras-senha" required />
        </label>
        <small id="regras-senha">Use pelo menos 8 caracteres, incluindo maiúscula, minúscula, número e símbolo.</small>
        <label>Confirme a senha<input name="confirmacao" type="password" autoComplete="new-password" required /></label>
        {erro && <p role="alert">{erro}</p>}
        <button disabled={enviando}>{enviando ? "Cadastrando..." : "Cadastrar"}</button>
      </form>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(<Cadastro />);
