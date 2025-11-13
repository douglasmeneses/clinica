# Clinica Frontend

Um frontend React para consumir uma API de clínica, construído com TypeScript, Tailwind CSS e Material-UI.

## Funcionalidades

- Tela de login com campos de email e senha
- Construído com React 19, TypeScript e Vite
- Estilizado com Tailwind CSS e Material-UI

## Começando

1. Instale as dependências: `npm install`
2. Inicie o servidor de desenvolvimento: `npm run dev`
3. Construa para produção: `npm run build`

## Estrutura do Projeto

- `src/App.tsx`: Componente principal da aplicação
- `src/components/Login.tsx`: Componente da tela de login
- `src/main.tsx`: Ponto de entrada da aplicação com tema MUI

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento
- `npm run build`: Constrói a aplicação para produção
- `npm run lint`: Executa o linter
- `npm run preview`: Visualiza a build de produção
  import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
globalIgnores(['dist']),
{
files: ['**/*.{ts,tsx}'],
extends: [
// Other configs...
// Enable lint rules for React
reactX.configs['recommended-typescript'],
// Enable lint rules for React DOM
reactDom.configs.recommended,
],
languageOptions: {
parserOptions: {
project: ['./tsconfig.node.json', './tsconfig.app.json'],
tsconfigRootDir: import.meta.dirname,
},
// other options...
},
},
])

```

```
