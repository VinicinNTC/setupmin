import { ler, gravar } from '../storage';
import type { Usuario } from '../models';

const USUARIOS = 'usuarios';
const SESSAO = 'sessao';

export const auth = {
  atual(): Usuario | null {
    const email = ler<string | null>(SESSAO, null);
    return email ? ler<Usuario[]>(USUARIOS, []).find(u => u.email === email) ?? null : null;
  },
  /** Retorna a mensagem de erro, ou null em caso de sucesso (já deixa o usuário logado). */
  cadastrar(nome: string, email: string, senha: string): string | null {
    email = email.trim().toLowerCase();
    if (!nome.trim() || !email || senha.length < 6) return 'Preencha tudo (senha com 6+ caracteres).';
    const usuarios = ler<Usuario[]>(USUARIOS, []);
    if (usuarios.some(u => u.email.toLowerCase() === email)) return 'Este e-mail já está cadastrado.';
    // TODO(NestJS): senha em texto puro é só para o protótipo — usar hash (bcrypt/argon2) no backend.
    gravar(USUARIOS, [...usuarios, { nome: nome.trim(), email, senha }]);
    gravar(SESSAO, email);
    return null;
  },
  entrar(email: string, senha: string): boolean {
    email = email.trim().toLowerCase();
    const u = ler<Usuario[]>(USUARIOS, []).find(x => x.email.toLowerCase() === email && x.senha === senha);
    if (u) gravar(SESSAO, u.email);
    return !!u;
  },
  sair(): void {
    localStorage.removeItem(SESSAO);
  },
};
