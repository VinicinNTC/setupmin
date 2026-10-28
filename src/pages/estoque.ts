import { auth } from '../services/auth';
import { catalogo } from '../services/catalog';
import { CATEGORIAS } from '../models';
import { brl, esc } from '../ui/dom';

export function estoquePage(): string {
  if (!auth.atual()) return '<div class="vazio"><h1>Área restrita</h1><p class="mut">Entre para gerenciar o estoque.</p><a class="btn" href="#/login">Entrar</a></div>';
  const linhas = catalogo.listar().map(p => `<tr>
    <td>${esc(p.nome)}</td><td class="mut">${CATEGORIAS[p.categoria]}</td><td>${brl(p.preco)}</td>
    <td><div class="qty"><button data-acao="est-" data-id="${p.id}" aria-label="Diminuir">−</button>
      <span class="${p.quantidade <= 5 ? 'baixo' : ''}">${p.quantidade}</span>
      <button data-acao="est+" data-id="${p.id}" aria-label="Aumentar">+</button></div></td>
    <td><button class="link" data-acao="excluir" data-id="${p.id}">Excluir</button></td></tr>`).join('');
  const opcoes = Object.entries(CATEGORIAS).map(([k, v]) => `<option value="${k}">${v}</option>`).join('');
  return `<h1 class="page">Estoque</h1>
    <form class="inline" data-form="produto">
      <input name="nome" placeholder="Nome do produto" required>
      <select name="categoria">${opcoes}</select>
      <input name="preco" placeholder="Preço" inputmode="decimal" required>
      <input name="quantidade" type="number" min="0" placeholder="Qtd" required>
      <button class="btn sm">Adicionar</button></form>
    <div class="scroll"><table><thead><tr><th>Produto</th><th>Categoria</th><th>Preço</th><th>Estoque</th><th></th></tr></thead><tbody>${linhas}</tbody></table></div>`;
}
