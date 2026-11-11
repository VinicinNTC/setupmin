import { useCallback, useState } from 'react';
import { Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { auth } from '@legacy/services/auth';
import { carrinho } from '@legacy/services/cart';
import { Layout } from './components/Layout';
import { Toast } from './components/Toast';
import { Home } from './pages/Home';
import { Products, ProductDetail } from './pages/Products';
import { Cart } from './pages/Cart';
import { Account } from './pages/Account';
import { Inventory } from './pages/Inventory';

export default function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [message, setMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const refresh = useCallback(() => setRefreshKey(value => value + 1), []);
  const notify = useCallback((text: string) => setMessage(text), []);
  const addToCart = (id: string) => {
    notify(carrinho.adicionar(id) ? 'Adicionado ao carrinho' : 'Sem estoque suficiente');
    refresh();
  };
  const checkout = () => {
    if (!auth.atual()) { notify('Entre para finalizar o pedido'); navigate('/login'); return; }
    carrinho.finalizar(); notify('Pedido realizado! 🎉'); refresh(); navigate('/');
  };
  return <>
    <Layout refreshKey={refreshKey} onRefresh={refresh}>
      <Routes location={location}>
        <Route path="/" element={<Home onAdd={addToCart} />} />
        <Route path="/produtos" element={<Products onAdd={addToCart} />} />
        <Route path="/produto/:id" element={<ProductRoute onAdd={addToCart} />} />
        <Route path="/carrinho" element={<Cart refresh={refresh} onCheckout={checkout} />} />
        <Route path="/login" element={<Account mode="login" notify={notify} refresh={refresh} />} />
        <Route path="/cadastro" element={<Account mode="register" notify={notify} refresh={refresh} />} />
        <Route path="/estoque" element={<Inventory refresh={refresh} notify={notify} />} />
        <Route path="*" element={<div className="vazio"><h1>404</h1><p className="mut">Página não encontrada.</p><button className="btn" onClick={() => navigate('/')}>Voltar ao início</button></div>} />
      </Routes>
    </Layout>
    <Toast message={message} onClose={() => setMessage('')} />
  </>;
}

function ProductRoute({ onAdd }: { onAdd: (id: string) => void }) {
  // A rota mantém o parâmetro em um componente separado para não acoplar páginas ao roteador.
  const { id = '' } = useParams();
  return <ProductDetail id={id} onAdd={onAdd} />;
}
