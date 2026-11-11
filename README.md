# 🖥️ TechMinimal

**Sua loja de acessórios para um setup completo!**

O TechMinimal é um projeto de e-commerce desenvolvido para apresentar e simular uma loja virtual de acessórios e produtos para setups de computadores, com foco em praticidade, organização e experiência do usuário.

O projeto conta com catálogo de produtos, filtros, carrinho de compras, autenticação de usuários e gerenciamento de estoque.

---

## ✨ Funcionalidades

- 🛍️ **Catálogo de produtos:** visualização dos produtos disponíveis.
- 🔎 **Filtros:** busca por categoria, preço e disponibilidade.
- 📦 **Detalhes do produto:** informações individuais de cada item.
- 🛒 **Carrinho de compras:** adição e gerenciamento de produtos.
- 🔐 **Autenticação:** cadastro e login de usuários.
- 📊 **Controle de estoque:** gerenciamento de produtos e quantidades.
- 💾 **Persistência local:** armazenamento de dados utilizando LocalStorage.

## 🚀 Tecnologias utilizadas

### Versão original
- TypeScript
- Vite
- HTML5
- CSS3
- JavaScript
- React

## 📁 Estrutura do projeto

```text
SetupMinimal/
│
├── public/
│
├── src/                  # Versão SPA (apenas typescript)
│   ├── data/
│   ├── pages/
│   ├── services/
│   ├── ui/
│   ├── main.ts
│   ├── models.ts
│   └── storage.ts
│
├── react/                # Versão React (a que utilizamos)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   └── vite.config.ts
│
├── package.json
└── README.md
```

## ⚙️ Como executar o projeto

### 1. Clone o repositório

```bash
git clone URL_DO_REPOSITORIO
```

### 2. Acesse a pasta

```bash
cd SetupMinimal
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Execute a aplicação

**Versão React:**

```bash
npm run dev
```

**Versão original (TypeScript):**

```bash
npm run dev:web
```

## 🏗️ Build e verificações

Para gerar a versão de produção:

```bash
npm run build
```

Para gerar o build da versão original:

```bash
npm run build:web
```

Verificação de tipos:

```bash
npm run typecheck
npm run typecheck:react
```

## 💾 Armazenamento de dados

O projeto utiliza o `localStorage` do navegador para persistir informações, sem necessidade de conexão com banco de dados externo.

Principais dados armazenados:

| Chave | Descrição |
|---|---|
| `usuarios` | Usuários cadastrados |
| `sessao` | Sessão atual |
| `carrinho` | Produtos adicionados |
| `estoque` | Produtos e quantidades |

**Observação:** os dados ficam armazenados localmente no navegador e não são sincronizados entre dispositivos.

## 🔄 Migração para React

O projeto também possui uma segunda implementação desenvolvida com React e TypeScript.

O objetivo da migração foi modernizar a arquitetura da aplicação, utilizando componentes reutilizáveis, organização por páginas e navegação com React Router, preservando a lógica de negócio e a compatibilidade com os dados existentes no LocalStorage.

As duas implementações são mantidas separadamente para permitir comparação, desenvolvimento e evolução independente.

## 🎯 Objetivo do projeto

Este projeto foi desenvolvido com o objetivo de aplicar conhecimentos de desenvolvimento web, construção de interfaces, organização de código, gerenciamento de estado e persistência de dados no navegador.

Também representa uma oportunidade de explorar a evolução de uma aplicação tradicional em TypeScript para uma arquitetura baseada em React.

---

**Desenvolvido com 💙 pela equipe SetupMinimal.**
