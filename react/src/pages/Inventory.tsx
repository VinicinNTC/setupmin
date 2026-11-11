import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '@legacy/services/auth';
import { catalogo } from '@legacy/services/catalog';
import { CATEGORIAS, type Categoria } from '@legacy/models';
import { brl } from '@legacy/ui/dom';

export function Inventory({ refresh, notify }: { refresh: () => void; notify: (message: string) => void }) {
  const [name, setName] = useState(''), [category, setCategory] = useState<Categoria>('suporte'), [price, setPrice] = useState(''), [quantity, setQuantity] = useState('');
  if (!auth.atual()) return <div className="vazio"><h1>Área restrita</h1><p className="mut">Entre para gerenciar o estoque.</p><Link className="btn" to="/login">Entrar</Link></div>;
  const products = catalogo.listar();
  const submit = (event: FormEvent) => { event.preventDefault(); catalogo.adicionar({ nome: name.trim(), categoria: category, preco: Number(price.replace(',', '.')) || 0, quantidade: Number(quantity) || 0, descricao: 'Novo produto cadastrado no estoque.', specs: [] }); notify('Produto adicionado'); setName(''); setPrice(''); setQuantity(''); refresh(); };
  return <><h1 className="page">Estoque</h1><form className="inline" onSubmit={submit}>
    <input value={name} onChange={e => setName(e.target.value)} placeholder="Nome do produto" required />
    <select value={category} onChange={e => setCategory(e.target.value as Categoria)}>{Object.entries(CATEGORIAS).map(([key, label]) => <option value={key} key={key}>{label}</option>)}</select>
    <input value={price} onChange={e => setPrice(e.target.value)} placeholder="Preço" inputMode="decimal" required />
    <input value={quantity} onChange={e => setQuantity(e.target.value)} type="number" min="0" placeholder="Qtd" required />
    <button className="btn sm">Adicionar</button></form>
    <div className="scroll"><table><thead><tr><th>Produto</th><th>Categoria</th><th>Preço</th><th>Estoque</th><th /></tr></thead><tbody>{products.map(product => <tr key={product.id}>
      <td>{product.nome}</td><td className="mut">{CATEGORIAS[product.categoria]}</td><td>{brl(product.preco)}</td>
      <td><div className="qty"><button aria-label="Diminuir" onClick={() => { catalogo.ajustarEstoque(product.id, -1); refresh(); }}>−</button><span className={product.quantidade <= 5 ? 'baixo' : ''}>{product.quantidade}</span><button aria-label="Aumentar" onClick={() => { catalogo.ajustarEstoque(product.id, 1); refresh(); }}>+</button></div></td>
      <td><button className="link" onClick={() => { catalogo.remover(product.id); notify('Produto excluído'); refresh(); }}>Excluir</button></td>
    </tr>)}</tbody></table></div>
  </>;
}
