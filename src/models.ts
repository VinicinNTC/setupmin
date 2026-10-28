// Contratos de dados. No futuro viram DTOs/entities do NestJS e tipos compartilhados com o React Native.
export type Categoria = 'suporte' | 'mousepad' | 'cabos' | 'luminaria';

export const CATEGORIAS: Record<Categoria, string> = {
  suporte: 'Suportes de Alumínio',
  mousepad: 'Mousepads Estendidos',
  cabos: 'Organizadores de Cabos',
  luminaria: 'Luminárias LED RGB',
};

export interface Usuario { nome: string; email: string; senha: string; }

export interface Produto {
  id: string;
  nome: string;
  categoria: Categoria;
  preco: number;
  quantidade: number; // estoque
  descricao: string;
  specs: string[];
  imagem?: string; // URL ou caminho em /public (ex.: /img/foto.jpg)
}

export interface ItemCarrinho { produtoId: string; qtd: number; }
