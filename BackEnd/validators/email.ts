export function emailValido(email: string): boolean {
	if (email.includes(" ")) return false;

	const partes = email.split("@");
	if (partes.length !== 2) return false;

	const [usuario, dominio] = partes;
	if (usuario.length === 0) return false;

	const posicaoDoPonto = dominio.lastIndexOf(".");
	return posicaoDoPonto > 0 && posicaoDoPonto < dominio.length - 1;
}