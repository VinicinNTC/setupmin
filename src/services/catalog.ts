import { ler, gravar } from '../storage';
import { PRODUTOS_INICIAIS, IMAGENS } from '../data/seed';
import type { Produto } from '../models';

const KEY = 'estoque';
const caminho = (f: string) => (/^(https?:)?\/\//.test(f) ? f : `/img/${f}`);
const comImagem = (p: Produto): Produto => ({ ...p, imagem: p.imagem ?? (IMAGENS[p.id] ? caminho(IMAGENS[p.id]) : undefined) });

function todos(): Produto[] {
  const salvos = ler<Produto[]>(KEY, []);
  if (salvos.length && salvos.every(p => typeof p.preco === 'number')) return salvos.map(comImagem);
  gravar(KEY, PRODUTOS_INICIAIS); // primeira visita (ou formato antigo): carrega o catálogo inicial
  return PRODUTOS_INICIAIS.map(comImagem);
}

export const catalogo = {
  listar(f: { categoria?: string; q?: string; min?: number; max?: number; emEstoque?: boolean } = {}): Produto[] {
    const q = (f.q ?? '').trim().toLowerCase();
    return todos().filter(p => (!f.categoria || p.categoria === f.categoria) && (!q || p.nome.toLowerCase().includes(q))
      && p.preco >= (f.min ?? 0) && p.preco < (f.max ?? Infinity) && (!f.emEstoque || p.quantidade > 0));
  },
  obter: (id: string) => todos().find(p => p.id === id),
  adicionar(dados: Omit<Produto, 'id'>): void {
    gravar(KEY, [...todos(), { ...dados, id: String(Date.now()) }]);
  },
  ajustarEstoque(id: string, delta: number): void {
    gravar(KEY, todos().map(p => (p.id === id ? { ...p, quantidade: Math.max(0, p.quantidade + delta) } : p)));
  },
  remover(id: string): void {
    gravar(KEY, todos().filter(p => p.id !== id));
  },
};
