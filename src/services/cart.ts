import { ler, gravar } from '../storage';
import { catalogo } from './catalog';
import type { ItemCarrinho, Produto } from '../models';

const KEY = 'carrinho';
const itensSalvos = () => ler<ItemCarrinho[]>(KEY, []);

export const carrinho = {
  itens(): (ItemCarrinho & { produto: Produto })[] {
    return itensSalvos().flatMap(i => {
      const produto = catalogo.obter(i.produtoId);
      return produto ? [{ ...i, produto }] : [];
    });
  },
  /** Respeita o estoque: retorna false se não houver unidades suficientes. */
  adicionar(id: string, qtd = 1): boolean {
    const p = catalogo.obter(id);
    const itens = itensSalvos();
    const atual = itens.find(i => i.produtoId === id);
    const novo = (atual?.qtd ?? 0) + qtd;
    if (!p || novo > p.quantidade) return false;
    gravar(KEY, atual ? itens.map(i => (i.produtoId === id ? { ...i, qtd: novo } : i)) : [...itens, { produtoId: id, qtd }]);
    return true;
  },
  alterar(id: string, delta: number): void {
    if (delta > 0) { carrinho.adicionar(id, delta); return; }
    gravar(KEY, itensSalvos().map(i => (i.produtoId === id ? { ...i, qtd: i.qtd + delta } : i)).filter(i => i.qtd > 0));
  },
  remover(id: string): void { gravar(KEY, itensSalvos().filter(i => i.produtoId !== id)); },
  limpar(): void { gravar(KEY, []); },
  total: () => carrinho.itens().reduce((s, i) => s + i.qtd * i.produto.preco, 0),
  quantidade: () => itensSalvos().reduce((s, i) => s + i.qtd, 0),
  /** Checkout simplificado: baixa o estoque e esvazia o carrinho. */
  finalizar(): void {
    carrinho.itens().forEach(i => catalogo.ajustarEstoque(i.produtoId, -i.qtd));
    carrinho.limpar();
  },
};
