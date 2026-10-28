import { auth } from './services/auth';
import { carrinho } from './services/cart';
import { catalogo } from './services/catalog';
import type { Categoria } from './models';
import { toast } from './ui/dom';
import { header, footer } from './ui/layout';
import { home } from './pages/home';
import { catalogoPage, produtoPage } from './pages/catalogo';
import { carrinhoPage } from './pages/carrinho';
import { loginPage, cadastroPage } from './pages/conta';
import { estoquePage } from './pages/estoque';

const app = document.getElementById('app')!;

// Rotas por hash (#/produtos, #/produto/p1...). Cada rota = uma função que devolve HTML.
const rotas: [RegExp, (m: string[], q: URLSearchParams) => string][] = [
  [/^\/$/, () => home()],
  [/^\/produtos$/, (_, q) => catalogoPage(q)],
  [/^\/produto\/(.+)$/, m => produtoPage(m[0])],
  [/^\/carrinho$/, () => carrinhoPage()],
  [/^\/login$/, () => loginPage()],
  [/^\/cadastro$/, () => cadastroPage()],
  [/^\/estoque$/, () => estoquePage()],
];

function render(rolar = true): void {
  const [caminho, qs = ''] = (location.hash.slice(1) || '/').split('?');
  const q = new URLSearchParams(qs);
  let corpo = '<div class="vazio"><h1>404</h1><p class="mut">Página não encontrada.</p><a class="btn" href="#/">Voltar ao início</a></div>';
  for (const [re, fn] of rotas) {
    const m = caminho.match(re);
    if (m) { corpo = fn(m.slice(1), q); break; }
  }
  app.innerHTML = `${header()}<main class="wrap">${corpo}</main>${footer()}`;
  if (rolar) window.scrollTo(0, 0);
}

// Cliques: qualquer elemento com data-acao
app.addEventListener('click', e => {
  const el = (e.target as HTMLElement).closest<HTMLElement>('[data-acao]');
  if (!el) return;
  const id = el.dataset.id ?? '';
  switch (el.dataset.acao) {
    case 'add': toast(carrinho.adicionar(id) ? 'Adicionado ao carrinho' : 'Sem estoque suficiente'); break;
    case 'mais': carrinho.alterar(id, 1); break;
    case 'menos': carrinho.alterar(id, -1); break;
    case 'remover': carrinho.remover(id); break;
    case 'limpar': carrinho.limpar(); break;
    case 'est+': catalogo.ajustarEstoque(id, 1); break;
    case 'est-': catalogo.ajustarEstoque(id, -1); break;
    case 'excluir': catalogo.remover(id); break;
    case 'sair': auth.sair(); location.hash = '#/'; break;
    case 'finalizar':
      if (!auth.atual()) { toast('Entre para finalizar o pedido'); location.hash = '#/login'; return; }
      carrinho.finalizar(); toast('Pedido realizado! 🎉'); location.hash = '#/'; break;
  }
  render(false);
});

// Formulários: qualquer <form data-form="...">
app.addEventListener('submit', e => {
  e.preventDefault();
  const f = e.target as HTMLFormElement;
  const d = Object.fromEntries(new FormData(f)) as Record<string, string>;
  switch (f.dataset.form) {
    case 'busca': location.hash = `#/produtos?q=${encodeURIComponent(d.q)}`; return;
    case 'login':
      if (auth.entrar(d.email, d.senha)) { toast('Bem-vindo de volta!'); location.hash = '#/'; }
      else toast('E-mail ou senha incorretos.');
      break;
    case 'cadastro': {
      const erro = auth.cadastrar(d.nome, d.email, d.senha);
      if (erro) toast(erro); else { toast('Conta criada!'); location.hash = '#/'; }
      break;
    }
    case 'produto':
      catalogo.adicionar({
        nome: d.nome.trim(), categoria: d.categoria as Categoria,
        preco: Number(d.preco.replace(',', '.')) || 0, quantidade: Number(d.quantidade) || 0,
        descricao: 'Novo produto cadastrado no estoque.', specs: [],
      });
      toast('Produto adicionado');
      break;
  }
  render(false);
});

window.addEventListener('hashchange', () => render(true));
render();
