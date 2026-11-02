export function errosDaSenha(senha: string): string[] {
	const erros: string[] = [];

	let temMinuscula = false;
	let temMaiuscula = false;
	let temNumero = false;
	let temEspecial = false;

	for (const letra of senha) {
		if (letra >= "a" && letra <= "z") {
			temMinuscula = true;
		} else if (letra >= "A" && letra <= "Z") {
			temMaiuscula = true;
		} else if (letra >= "0" && letra <= "9") {
			temNumero = true;
		} else if (letra !== " ") {
			temEspecial = true;
		}
	}

	if (senha.length < 8) erros.push("A senha deve ter no mínimo 8 caracteres");
	if (!temMinuscula) erros.push("A senha deve ter uma letra minúscula");
	if (!temMaiuscula) erros.push("A senha deve ter uma letra maiúscula");
	if (!temNumero) erros.push("A senha deve ter um número");
	if (!temEspecial) erros.push("A senha deve ter um caractere especial (ex.: @, #, !)");

	return erros;
}