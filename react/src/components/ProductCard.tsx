import { Link } from 'react-router-dom';
import type { Produto } from '@legacy/models';
import { arte } from '@legacy/ui/art';
import { brl, esc } from '@legacy/ui/dom';

export function ProductMedia({ product, big = false, mini = false }: { product: Produto; big?: boolean; mini?: boolean }) {
  return <div className={`art${big ? ' big' : ''}${mini ? ' mini' : ''}`}>{product.imagem ? <img src={product.imagem} alt={product.nome} loading="lazy" /> : <span dangerouslySetInnerHTML={{ __html: arte(product.categoria) }} />}</div>;
}

export function ProductCard({ product, onAdd }: { product: Produto; onAdd: (id: string) => void }) {
  const stars = 4 + (Number(product.id.replace(/\D/g, '')) % 2);
  return <article className="prod">
    <Link to={`/produto/${product.id}`} className="art">{product.imagem ? <img src={product.imagem} alt={product.nome} loading="lazy" /> : <span dangerouslySetInnerHTML={{ __html: arte(product.categoria) }} />}</Link>
    <h3><Link to={`/produto/${product.id}`}>{product.nome}</Link></h3>
    <div className="stars">{'★'.repeat(stars)}{'☆'.repeat(5 - stars)}</div>
    <strong className="pr">{brl(product.preco)}</strong>
    {product.quantidade === 0 ? <span className="btn off">Esgotado</span> : <button className="btn" onClick={() => onAdd(product.id)}>Adicionar ao carrinho</button>}
  </article>;
}
