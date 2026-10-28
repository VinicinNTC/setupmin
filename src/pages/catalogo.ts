import { catalogo } from '../services/catalog';
import { CATEGORIAS } from '../models';
import { midia } from '../ui/art';
import { brl, esc } from '../ui/dom';
import { card } from '../ui/layout';

const FAIXAS: Record<string, [string, number, number]> = {
  a: ['Até R$ 100', 0, 100], b: ['R$ 100 a R$ 200', 100, 200], c: ['Acima de R$ 200', 200, Infinity],
};

const href = (q: URLSearchParams, mud: Record<string, string>) => {
  const n = new URLSearchParams(q);
  for (const [k, v] of Object.entries(mud)) v ? n.set(k, v) : n.delete(k);
  const s = n.toString();
  return `#/produtos${s ? `?${s}` : ''}`;
};

export function sidebar(q = new URLSearchParams()): string {
  const cat = q.get('categoria') ?? '', fx = q.get('preco') ?? '', est = q.get('estoque') === '1';
  const opt = (on: boolean, label: string, to: string) => `<a class="opt${on ? ' on' : ''}" href="${to}"><i></i>${label}</a>`;
  return `<aside class="side">
    <div class="fgrp"><h4>Categoria</h4>${Object.entries(CATEGORIAS).map(([k, v]) => opt(k === cat, v, href(q, { categoria: k === cat ? '' : k }))).join('')}</div>
    <div class="fgrp"><h4>Preço</h4>${Object.entries(FAIXAS).map(([k, [l]]) => opt(k === fx, l, href(q, { preco: k === fx ? '' : k }))).join('')}</div>
    <div class="fgrp"><h4>Disponibilidade</h4>${opt(est, 'Somente em estoque', href(q, { estoque: est ? '' : '1' }))}</div></aside>`;
}

export function catalogoPage(q: URLSearchParams): string {
  const busca = q.get('q') ?? '';
  const [, min, max] = FAIXAS[q.get('preco') ?? ''] ?? ['', 0, Infinity];
  const lista = catalogo.listar({ categoria: q.get('categoria') ?? '', q: busca, min, max, emEstoque: q.get('estoque') === '1' });
  return `<div class="shop">${sidebar(q)}<section>
    <h2 class="stitle">${busca ? `Resultados para “${esc(busca)}”` : 'Produtos'} <span>${lista.length} itens</span></h2>
    ${lista.length ? `<div class="grid">${lista.map(p => card(p)).join('')}</div>` : '<p class="vazio">Nenhum produto encontrado com esses filtros.</p>'}</section></div>`;
}

export function produtoPage(id: string): string {
  const p = catalogo.obter(id);
  if (!p) return '<div class="vazio"><h1>Produto não encontrado</h1><a class="btn" href="#/produtos">Ver catálogo</a></div>';
  const estoque = p.quantidade === 0 ? '<span class="tag out">Esgotado</span>'
    : p.quantidade <= 5 ? `<span class="tag low">Últimas ${p.quantidade} unidades</span>` : '<span class="tag ok">Em estoque</span>';
  return `<a class="mut" href="#/produtos?categoria=${p.categoria}">← ${CATEGORIAS[p.categoria]}</a>
    <section class="detalhe">
      <div class="art big">${midia(p)}</div>
      <div><h1>${esc(p.nome)}</h1>
        <p class="preco">${brl(p.preco)}</p><p class="mut">ou 6x de ${brl(p.preco / 6)} sem juros</p>
        <p>${esc(p.descricao)}</p>
        <ul class="specs">${p.specs.map(s => `<li>${esc(s)}</li>`).join('')}</ul>
        <div class="row">${estoque}${p.quantidade ? `<button class="btn" data-acao="add" data-id="${p.id}">Adicionar ao carrinho</button>` : ''}</div>
      </div></section>`;
}
