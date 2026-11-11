import { Link } from 'react-router-dom';
import { carrinho } from '@legacy/services/cart';
import { brl } from '@legacy/ui/dom';
import { ProductMedia } from '../components/ProductCard';

export function Cart({ refresh, onCheckout }: { refresh: () => void; onCheckout: () => void }) {
  const items = carrinho.itens();
  if (!items.length) return <div className="vazio"><h1>Seu carrinho está vazio</h1><p className="mut">Que tal começar pelos suportes de alumínio?</p><Link className="btn" to="/produtos">Ver produtos</Link></div>;
  return <><h1 className="page">Carrinho</h1><div className="cols"><ul className="lista">{items.map(({ produto, qtd }) => <li className="linha" key={produto.id}>
    <ProductMedia product={produto} mini /><div className="grow"><Link to={`/produto/${produto.id}`}>{produto.nome}</Link><div className="mut">{brl(produto.preco)}</div></div>
    <div className="qty"><button aria-label="Diminuir" onClick={() => { carrinho.alterar(produto.id, -1); refresh(); }}>−</button><span>{qtd}</span><button aria-label="Aumentar" onClick={() => { carrinho.alterar(produto.id, 1); refresh(); }}>+</button></div>
    <strong className="sub">{brl(produto.preco * qtd)}</strong><button className="link" onClick={() => { carrinho.remover(produto.id); refresh(); }}>Remover</button>
  </li>)}</ul><aside className="resumo"><h2>Resumo</h2><div className="tot"><span>Total</span><strong>{brl(carrinho.total())}</strong></div><button className="btn" onClick={onCheckout}>Finalizar pedido</button><button className="btn danger" onClick={() => { carrinho.limpar(); refresh(); }}>Esvaziar carrinho</button></aside></div></>;
}
