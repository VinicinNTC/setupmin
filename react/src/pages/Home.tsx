import { Link } from 'react-router-dom';
import { catalogo } from '@legacy/services/catalog';
import { ProductCard } from '../components/ProductCard';
import { arte } from '@legacy/ui/art';
import { Filters } from './Products';

export function Home({ onAdd }: { onAdd: (id: string) => void }) {
  const products = catalogo.listar();
  return <>
    <section className="banner">
      <div><h1>ACESSÓRIOS PARA O SEU SETUP</h1><p>Suportes de alumínio, mousepads estendidos, organizadores de cabos, luminárias e etc.</p><div className="row"><Link className="btn blue" to="/produtos">Ver produtos</Link></div></div>
      <div className="banner-art" dangerouslySetInnerHTML={{ __html: arte('luminaria') }} />
    </section>
    <div className="shop"><Filters redirectToProducts /><div>
      <h2 className="stitle">1. Em destaque</h2><div className="grid">{products.filter((_, i) => i % 2 === 0).map(p => <ProductCard key={p.id} product={p} onAdd={onAdd} />)}</div>
      <h2 className="stitle">2. Mais produtos</h2><div className="grid">{products.filter((_, i) => i % 2 === 1).map(p => <ProductCard key={p.id} product={p} onAdd={onAdd} />)}</div>
    </div></div>
  </>;
}
