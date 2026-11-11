import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '@legacy/services/auth';

export function Account({ mode, notify, refresh }: { mode: 'login' | 'register'; notify: (message: string) => void; refresh: () => void }) {
  const navigate = useNavigate();
  const [name, setName] = useState(''), [email, setEmail] = useState(''), [password, setPassword] = useState('');
  const register = mode === 'register';
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (register) {
      const error = auth.cadastrar(name, email, password);
      if (error) { notify(error); return; }
      notify('Conta criada!');
    } else {
      if (!auth.entrar(email, password)) { notify('E-mail ou senha incorretos.'); return; }
      notify('Bem-vindo de volta!');
    }
    refresh(); navigate('/');
  };
  return <div className="auth"><h1>{register ? 'Criar conta' : 'Entrar'}</h1><form className="form" onSubmit={submit}>
    {register && <label>Nome<input name="nome" value={name} onChange={e => setName(e.target.value)} required /></label>}
    <label>E-mail<input name="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required /></label>
    <label>{register ? 'Senha (6+ caracteres)' : 'Senha'}<input name="senha" type="password" minLength={register ? 6 : undefined} value={password} onChange={e => setPassword(e.target.value)} required /></label>
    <button className="btn">{register ? 'Cadastrar' : 'Entrar'}</button>
  </form><p className="mut">{register ? <>Já tem conta? <Link className="lnk" to="/login">Entrar</Link></> : <>Novo por aqui? <Link className="lnk" to="/cadastro">Crie sua conta</Link></>}</p></div>;
}
