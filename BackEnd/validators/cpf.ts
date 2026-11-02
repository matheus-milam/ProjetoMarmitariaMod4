export function somenteNumeros(texto: string): string {
	return texto.replace(/\D/g, "");
}

export function cpfValido(cpf: string): boolean {
	const numeros = somenteNumeros(cpf);

	if (numeros.length !== 11) return false;
	if (numeros === numeros[0].repeat(11)) return false;

	const digitos = numeros.split("").map(Number);

	let soma = 0;
	for (let i = 0; i < 9; i++) {
		soma += digitos[i] * (10 - i);
	}
	let primeiroDigito = (soma * 10) % 11;
	if (primeiroDigito === 10) primeiroDigito = 0;
	if (primeiroDigito !== digitos[9]) return false;

	soma = 0;
	for (let i = 0; i < 10; i++) {
		soma += digitos[i] * (11 - i);
	}
	let segundoDigito = (soma * 10) % 11;
	if (segundoDigito === 10) segundoDigito = 0;

	return segundoDigito === digitos[10];
}