// Única porta de entrada para o localStorage. Trocar por chamadas HTTP depois = mexer só aqui e nos services.
export function ler<T>(chave: string, padrao: T): T {
  try {
    const v = localStorage.getItem(chave);
    return v ? (JSON.parse(v) as T) : padrao;
  } catch {
    return padrao;
  }
}
export function gravar<T>(chave: string, valor: T): void {
  localStorage.setItem(chave, JSON.stringify(valor));
}
