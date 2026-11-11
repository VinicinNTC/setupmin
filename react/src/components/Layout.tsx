import { FormEvent, ReactNode, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '@legacy/services/auth';
import { carrinho } from '@legacy/services/cart';
import { CATEGORIAS, FORA_DO_MENU, type Categoria } from '@legacy/models';

export function Layout({ children, refreshKey, onRefresh }: { children: ReactNode; refreshKey: number; onRefresh: () => void }) {
  const user = auth.atual();
  const count = carrinho.quantidade();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const submitSearch = (event: FormEvent) => {
    event.preventDefault();
    navigate(`/produtos?q=${encodeURIComponent(search)}`);
  };
  return <>
    <header className="top">
      <div className="top-in">
        <Link className="logo" to="/"><span className="cube">⚡</span><span>TECH<small>MINIMAL</small></span></Link>
        <form className="busca" onSubmit={submitSearch}>
          <input name="q" value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar no Tech minimal" aria-label="Buscar" />
          <button aria-label="Buscar" type="submit"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="6"/><path d="m20 20-4.5-4.5"/></svg></button>
        </form>
        <div className="acoes">
          {user ? <button className="ic" title="Sair" onClick={() => { auth.sair(); onRefresh(); navigate('/'); }}><span>♙</span><span>{user.nome.split(' ')[0]} · sair</span></button> : <Link className="ic" to="/login"><span>♙</span><span>Entrar</span></Link>}
          <Link className="ic" to="/carrinho" aria-label="Carrinho"><span>🛒</span>{count > 0 && <b className="badge">{count}</b>}</Link>
        </div>
      </div>
      <nav className="menu"><div className="menu-in"><Link to="/produtos">Todos os produtos</Link>{Object.entries(CATEGORIAS).filter(([key]) => !FORA_DO_MENU.includes(key as Categoria)).map(([key, label]) => <Link key={key} to={`/produtos?categoria=${key}`}>{label}</Link>)}<span className="grow" />{user && <Link to="/estoque">Estoque</Link>}</div></nav>
    </header>
    <main className="wrap" key={refreshKey}>{children}</main>
    <footer className="foot"><span>Tech Minimal</span><span>MVP · Protótipo · dados salvos</span></footer>
  </>;
}
