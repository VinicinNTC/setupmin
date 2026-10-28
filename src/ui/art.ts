import type { Categoria, Produto } from '../models';
import { esc } from './dom';

// Ilustrações SVG minimalistas (placeholder até existirem fotos reais dos produtos).
const RGB = '<defs><linearGradient id="rgb"><stop offset="0" stop-color="#ff4d8d"/><stop offset=".5" stop-color="#4ade80"/><stop offset="1" stop-color="#38bdf8"/></linearGradient></defs>';

const DESENHOS: Record<Categoria, string> = {
  suporte: '<rect class="a" x="48" y="22" width="104" height="64" rx="6"/><path class="b" d="M38 94h124l-8 10H46z"/><path class="s" d="M78 104l-10 30M122 104l10 30M60 134h20M120 134h20"/>',
  mousepad: '<rect class="b" x="12" y="44" width="176" height="70" rx="12"/><rect class="a" x="30" y="58" width="84" height="24" rx="4"/><rect class="a" x="140" y="56" width="20" height="32" rx="10"/><path class="s" d="M150 56v10"/>',
  cabos: '<rect class="b" x="70" y="96" width="60" height="22" rx="6"/><path class="s" d="M20 40c50 0 40 56 80 56M180 40c-50 0-40 56-80 56M100 20v76"/><circle class="a" cx="100" cy="20" r="6"/>',
  luminaria: `${RGB}<ellipse cx="100" cy="62" rx="62" ry="40" fill="url(#rgb)" opacity=".22"/><rect class="b" x="76" y="132" width="48" height="8" rx="4"/><path class="s" d="M100 132V84"/><rect x="70" y="52" width="60" height="14" rx="7" fill="url(#rgb)"/>`,
};

export const arte = (c: Categoria) => `<svg viewBox="0 0 200 150" role="img" aria-hidden="true">${DESENHOS[c]}</svg>`;

/** Foto do produto se existir; senão a ilustração SVG da categoria. */
export const midia = (p: Produto) =>
  p.imagem ? `<img src="${esc(p.imagem)}" alt="${esc(p.nome)}" loading="lazy">` : arte(p.categoria);
