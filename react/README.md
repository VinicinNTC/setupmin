# Versão React

A versão React fica isolada em `react/` e reutiliza os serviços, modelos e utilitários TypeScript da aplicação original por meio do alias `@legacy`.

Na raiz do projeto:

```bash
npm install
npm run dev       # React
npm run dev:web   # aplicação original
```

Os dois ambientes usam a mesma origem/porta padrão (5173), portanto execute apenas um servidor por vez para compartilhar o mesmo localStorage no navegador.

Builds:

```bash
npm run build       # React -> dist-react
npm run build:web   # original -> dist
```
