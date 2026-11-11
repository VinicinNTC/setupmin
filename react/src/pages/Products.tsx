import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { catalogo } from '@legacy/services/catalog';
import { CATEGORIAS } from '@legacy/models';
import { brl } from '@legacy/ui/dom';
import { ProductCard, ProductMedia } from '../components/ProductCard';

const RANGES: Record<string, [string, number, number]> = { a: ['Até R$ 100', 0, 100], b: ['R$ 100 a R$ 200', 100, 200], c: ['Acima de R$ 200', 200, Infinity] };
export function Filters({ redirectToProducts = false }: { redirectToProducts?: boolean } = {}) {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const category = params.get('categoria') ?? '', range = params.get('preco') ?? '', stock = params.get('estoque') === '1';
  const option = (active: boolean, label: string, key: string, value: string) => <button type="button" className={`opt${active ? ' on' : ''}`} onClick={() => { const next = new URLSearchParams(params); if (active || !value) next.delete(key); else next.set(key, value); if (redirectToProducts && location.pathname !== '/produtos') navigate(`/produtos${next.toString() ? `?${next.toString()}` : ''}`); else setParams(next); }}><i />{label}</button>;
  return <aside className="side">
    <div className="fgrp"><h4>Categoria</h4>{Object.entries(CATEGORIAS).map(([key, label]) => <div key={key}>{option(category === key, label, 'categoria', key)}</div>)}</div>
    <div className="fgrp"><h4>Preço</h4>{Object.entries(RANGES).map(([key, [label]]) => <div key={key}>{option(range === key, label, 'preco', key)}</div>)}</div>
    <div className="fgrp"><h4>Disponibilidade</h4>{option(stock, 'Somente em estoque', 'estoque', '1')}</div>
  </aside>;
}
export function Products({ onAdd }: { onAdd: (id: string) => void }) {
  const [params] = useSearchParams();
  const query = params.get('q') ?? '';
  const [, min, max] = RANGES[params.get('preco') ?? ''] ?? ['', 0, Infinity];
  const list = catalogo.listar({ categoria: params.get('categoria') ?? '', q: query, min, max, emEstoque: params.get('estoque') === '1' });
  return <div className="shop"><Filters /><section><h2 className="stitle">{query ? `Resultados para “${query}”` : 'Produtos'} <span>{list.length} itens</span></h2>
    {list.length ? <div className="grid">{list.map(p => <ProductCard key={p.id} product={p} onAdd={onAdd} />)}</div> : <p className="vazio">Nenhum produto encontrado com esses filtros.</p>}
  </section></div>;
}
export function ProductDetail({ id, onAdd }: { id: string; onAdd: (id: string) => void }) {
  const product = catalogo.obter(id);
  if (!product) return <div className="vazio"><h1>Produto não encontrado</h1><Link className="btn" to="/produtos">Ver catálogo</Link></div>;
  const stock = product.quantidade === 0 ? <span className="tag out">Esgotado</span> : product.quantidade <= 5 ? <span className="tag low">Últimas {product.quantidade} unidades</span> : <span className="tag ok">Em estoque</span>;
  return <><Link className="mut" to={`/produtos?categoria=${product.categoria}`}>← {CATEGORIAS[product.categoria]}</Link><section className="detalhe">
    <ProductMedia product={product} big /><div><h1>{product.nome}</h1><p className="preco">{brl(product.preco)}</p><p className="mut">ou 6x de {brl(product.preco / 6)} sem juros</p><p>{product.descricao}</p>
      <ul className="specs">{product.specs.map(spec => <li key={spec}>{spec}</li>)}</ul><div className="row">{stock}{product.quantidade > 0 && <button className="btn" onClick={() => onAdd(product.id)}>Adicionar ao carrinho</button>}</div>
    </div></section></>;
}
