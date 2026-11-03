export function cpfValido(cpf: string): boolean {
  if (!/^\d{11}$/.test(cpf) || cpf === cpf[0].repeat(11)) return false;

  for (const tamanho of [9, 10]) {
    let soma = 0;
    for (let i = 0; i < tamanho; i++) {
      soma += Number(cpf[i]) * (tamanho + 1 - i);
    }
    const digito = ((soma * 10) % 11) % 10;
    if (digito !== Number(cpf[tamanho])) return false;
  }

  return true;
}
