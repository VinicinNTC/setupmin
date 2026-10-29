import { auth } from '../services/auth';
import { carrinho } from '../services/cart';
import { CATEGORIAS, type Produto } from '../models';
import { midia } from './art';
import { brl, esc } from './dom';

const svg = (d: string) => `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">${d}</svg>`;
const IC_USER = svg('<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>');
const IC_CART = svg('<path d="M3 4h2l2.4 10.5h10.2L20 7H6"/><circle cx="9" cy="19" r="1.4"/><circle cx="17" cy="19" r="1.4"/>');
const IC_BUSCA = svg('<circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5"/>');

export function header(): string {
  const u = auth.atual();
  const n = carrinho.quantidade();
  const cats = Object.entries(CATEGORIAS).map(([k, v]) => `<a href="#/produtos?categoria=${k}">${v}</a>`).join('');
  return `<header class="top">
    <div class="top-in">
      <a class="logo" href="#/"><span class="cube">⚡</span><span>TECH<small>MINIMAL</small></span></a>
      <form class="busca" data-form="busca"><input name="q" placeholder="Buscar suportes, mousepads, luminárias…" aria-label="Buscar"><button aria-label="Buscar">${IC_BUSCA}</button></form>
      <div class="acoes">
        ${u ? `<button class="ic" data-acao="sair" title="Sair">${IC_USER}<span>${esc(u.nome.split(' ')[0])} · sair</span></button>` : `<a class="ic" href="#/login">${IC_USER}<span>Entrar</span></a>`}
        <a class="ic" href="#/carrinho" aria-label="Carrinho">${IC_CART}${n ? `<b class="badge">${n}</b>` : ''}</a>
      </div>
    </div>
    <nav class="menu"><div class="menu-in"><a href="#/produtos">Todos os produtos</a>${cats}<span class="grow"></span>${u ? '<a href="#/estoque">Estoque</a>' : ''}</div></nav>
  </header>`;
}

export const footer = () =>
  `<footer class="foot"><span>⚡ Tech Minimal </span><span>Protótipo · dados salvos</span></footer>`;

export function card(p: Produto): string {
  const n = 4 + (Number(p.id.replace(/\D/g, '')) % 2); // avaliação provisória (placeholder)
  const botao = p.quantidade === 0
    ? '<span class="btn off">Esgotado</span>'
    : `<button class="btn" data-acao="add" data-id="${p.id}">Adicionar ao carrinho</button>`;
  return `<article class="prod">
    <a href="#/produto/${p.id}" class="art">${midia(p)}</a>
    <h3><a href="#/produto/${p.id}">${esc(p.nome)}</a></h3>
    <div class="stars">${'★'.repeat(n)}${'☆'.repeat(5 - n)}</div>
    <strong class="pr">${brl(p.preco)}</strong>${botao}</article>`;
}
