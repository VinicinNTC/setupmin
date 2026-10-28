const campo = (nome: string, rotulo: string, tipo = 'text', extra = '') =>
  `<label>${rotulo}<input name="${nome}" type="${tipo}" required ${extra}></label>`;

export const loginPage = () => `<div class="auth"><h1>Entrar</h1>
  <form class="form" data-form="login">${campo('email', 'E-mail', 'email')}${campo('senha', 'Senha', 'password')}<button class="btn">Entrar</button></form>
  <p class="mut">Novo por aqui? <a class="lnk" href="#/cadastro">Crie sua conta</a></p></div>`;

export const cadastroPage = () => `<div class="auth"><h1>Criar conta</h1>
  <form class="form" data-form="cadastro">${campo('nome', 'Nome')}${campo('email', 'E-mail', 'email')}${campo('senha', 'Senha (6+ caracteres)', 'password', 'minlength="6"')}<button class="btn">Cadastrar</button></form>
  <p class="mut">Já tem conta? <a class="lnk" href="#/login">Entrar</a></p></div>`;
