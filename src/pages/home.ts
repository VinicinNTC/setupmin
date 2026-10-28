import { catalogo } from '../services/catalog';
import { arte } from '../ui/art';
import { card } from '../ui/layout';
import { sidebar } from './catalogo';

export function home(): string {
  const todos = catalogo.listar();
  return `
  <section class="banner">
    <div><h1>ACESSÓRIOS PARA O SEU SETUP</h1>
      <p>Suportes de alumínio, mousepads estendidos, organizadores de cabos e luminárias LED RGB.</p>
      <div class="row"><a class="btn blue" href="#/produtos">Ver produtos</a><a class="btn line" href="#/produtos?categoria=luminaria">Luminárias RGB</a></div></div>
    <div class="banner-art">${arte('luminaria')}</div>
  </section>
  <div class="shop">${sidebar()}<div>
    <h2 class="stitle">1. Em destaque</h2><div class="grid">${todos.filter((_, i) => i % 2 === 0).map(p => card(p)).join('')}</div>
    <h2 class="stitle">2. Mais produtos</h2><div class="grid">${todos.filter((_, i) => i % 2 === 1).map(p => card(p)).join('')}</div>
  </div></div>`;
}
