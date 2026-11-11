# Migração React — Tech Minimal

A versão TypeScript original foi mantida em `src/` e continua sendo iniciada por `npm run dev:web`.
A nova versão React + TypeScript (TSX) está em `react/` e é iniciada por `npm run dev`.

## Instalar dependências

```bash
npm install
```

## Executar

```bash
npm run dev       # React + React Router (http://localhost:5173)
npm run dev:web   # SPA original (http://localhost:5173)
```

Execute apenas uma versão por vez. Ambas usam a mesma porta/origem para que o navegador compartilhe o mesmo `localStorage`.

## Builds e verificações

```bash
npm run build             # build React em dist-react/
npm run build:web         # build original em dist/
npm run typecheck         # TypeScript original
npm run typecheck:react   # TypeScript/TSX React
```

## Compatibilidade de dados

A aplicação React reutiliza os modelos, armazenamento e serviços da versão atual (`src/models.ts`, `src/storage.ts` e `src/services/`). As chaves `usuarios`, `sessao`, `carrinho` e `estoque` não foram renomeadas nem tiveram seus formatos alterados.

## Observação sobre validação

As dependências foram declaradas no `package.json`, mas a instalação e os builds não puderam ser executados neste ambiente por indisponibilidade/timeout de acesso ao registry npm. Rode `npm install` e depois os comandos de build acima no seu ambiente para validar a instalação local.
