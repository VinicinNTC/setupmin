import { carrinho } from '../services/cart';
import { midia } from '../ui/art';
import { brl, esc } from '../ui/dom';

export function carrinhoPage(): string {
  const itens = carrinho.itens();
  if (!itens.length) return '<div class="vazio"><h1>Seu carrinho está vazio</h1><p class="mut">Que tal começar pelos suportes de alumínio?</p><a class="btn" href="#/produtos">Ver produtos</a></div>';
  const linhas = itens.map(({ produto: p, qtd }) => `
    <li class="linha"><div class="art mini">${midia(p)}</div>
      <div class="grow"><a href="#/produto/${p.id}">${esc(p.nome)}</a><div class="mut">${brl(p.preco)}</div></div>
      <div class="qty"><button data-acao="menos" data-id="${p.id}" aria-label="Diminuir">−</button><span>${qtd}</span><button data-acao="mais" data-id="${p.id}" aria-label="Aumentar">+</button></div>
      <strong class="sub">${brl(p.preco * qtd)}</strong>
      <button class="link" data-acao="remover" data-id="${p.id}">Remover</button></li>`).join('');
  return `<h1 class="page">Carrinho</h1>
    <div class="cols"><ul class="lista">${linhas}</ul>
      <aside class="resumo"><h2>Resumo</h2>
        <div class="tot"><span>Total</span><strong>${brl(carrinho.total())}</strong></div>
        <button class="btn" data-acao="finalizar">Finalizar pedido</button>
        <button class="btn danger" data-acao="limpar">Esvaziar carrinho</button></aside></div>`;
}
