# 🤝 Guia de Contribuição

Obrigado por se interessar em contribuir para o **Sistema de Gerenciamento de Clínica Médica**!

Este documento fornece diretrizes e instruções para contribuir com o projeto.

## 📋 Índice

- [Código de Conduta](#código-de-conduta)
- [Como Começar](#como-começar)
- [Processo de Contribuição](#processo-de-contribuição)
- [Padrões de Código](#padrões-de-código)
- [Git Workflow](#git-workflow)
- [Mensagens de Commit](#mensagens-de-commit)
- [Pull Requests](#pull-requests)
- [Reportando Bugs](#reportando-bugs)
- [Sugestões de Features](#sugestões-de-features)

---

## 📜 Código de Conduta

Este projeto adota um Código de Conduta para garantir um ambiente respeitoso:

- ✅ Seja respeitoso e inclusivo
- ✅ Acolha perspectivas diferentes
- ✅ Forneça feedback construtivo
- ✅ Foque na qualidade do código, não na pessoa
- ✅ Relporte comportamento inadequado aos mantenedores

---

## 🚀 Como Começar

### 1. Faça um Fork do Projeto

```bash
# Visite: https://github.com/douglasmeneses/clinica-api
# Clique em "Fork" no canto superior direito
```

### 2. Clone seu Fork

```bash
git clone https://github.com/SEU_USUARIO/clinica-api.git
cd clinica-api
```

### 3. Adicione o Upstream (repositório original)

```bash
git remote add upstream https://github.com/douglasmeneses/clinica-api.git
```

### 4. Configure o Projeto Localmente

```bash
# Backend
cd clinica-api
npm install
npx prisma generate
npx prisma migrate dev

# Frontend
cd ../clinica-frontend
npm install
```

---

## 🔄 Processo de Contribuição

### 1. Crie uma Branch

```bash
# Atualize seu fork com as últimas mudanças
git fetch upstream
git checkout main
git merge upstream/main

# Crie uma branch para sua feature
git checkout -b feature/sua-feature
# ou para bug fix
git checkout -b fix/seu-bug
```

### 2. Faça as Mudanças

- Mantenha as mudanças focadas em um único aspecto
- Teste suas mudanças localmente
- Siga os padrões de código do projeto

### 3. Commit suas Mudanças

```bash
git add .
git commit -m "type: descrição breve da mudança"
```

### 4. Push para seu Fork

```bash
git push origin feature/sua-feature
```

### 5. Crie um Pull Request

- Vá para o repositório original
- Clique em "New Pull Request"
- Compare seu fork com main
- Descreva suas mudanças em detalhes

---

## 💻 Padrões de Código

### TypeScript

```typescript
// ✅ BOM
interface User {
  id: number;
  name: string;
  email: string;
}

/**
 * Busca um usuário por ID
 * @param id - ID do usuário
 * @returns Usuário encontrado ou null
 */
export const getUserById = async (id: number): Promise<User | null> => {
  return db.user.findUnique({ where: { id } });
};

// ❌ RUIM
const getUser = async (id) => {
  return db.user.findUnique({ where: { id } });
};
```

### React

```typescript
// ✅ BOM
import { useCallback, useMemo } from "react";
import { Box, Button } from "@mui/material";

export const UserComponent: React.FC = () => {
  const handleClick = useCallback(() => {
    console.log("Clicado");
  }, []);

  return (
    <Box>
      <Button onClick={handleClick}>Clique aqui</Button>
    </Box>
  );
};

// ❌ RUIM
export const UserComponent = () => {
  return (
    <div>
      <button onClick={() => console.log("Clicado")}>Clique</button>
    </div>
  );
};
```

### Nomes

```typescript
// ✅ BOM - Descritivos e claros
const calculateUserAge = (birthDate: Date): number => { ... }
const isEmailValid = (email: string): boolean => { ... }
const formatDateToLocaleString = (date: Date): string => { ... }

// ❌ RUIM - Genéricos e ambíguos
const calc = (date: Date): number => { ... }
const check = (email: string): boolean => { ... }
const format = (date: Date): string => { ... }
```

### Funções

- Mantenha funções pequenas (< 20 linhas)
- Uma responsabilidade por função
- Use nomes descritivos
- Adicione JSDoc em funções públicas

### Estilos

- Use Material-UI `sx` prop (não Tailwind)
- Siga a paleta de cores do tema
- Teste em diferentes tamanhos de tela

---

## 🌳 Git Workflow

### Branch Naming

```
feature/      - Nova funcionalidade
fix/          - Correção de bug
docs/         - Documentação
refactor/     - Refatoração
test/         - Testes
chore/        - Tarefas de manutenção
```

**Exemplos:**

```
feature/add-user-authentication
fix/login-validation-error
docs/update-readme
refactor/extract-filter-logic
test/add-unit-tests-for-auth
chore/update-dependencies
```

---

## 📝 Mensagens de Commit

Seguimos o padrão **Conventional Commits**:

```
type(scope): subject

body

footer
```

### Tipos

- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Documentação
- `style:` - Formatação de código
- `refactor:` - Refatoração
- `test:` - Testes
- `chore:` - Tarefas de manutenção
- `perf:` - Melhoria de performance

### Exemplos

```bash
# ✅ BOM
git commit -m "feat(auth): adicionar autenticação com JWT"
git commit -m "fix(login): corrigir erro de validação de email"
git commit -m "docs(readme): adicionar guia de instalação"
git commit -m "refactor(services): extrair lógica de filtros"

# ❌ RUIM
git commit -m "fix stuff"
git commit -m "updated code"
git commit -m "WIP"
```

---

## 🔀 Pull Requests

### Antes de Submeter

- [ ] Code está testado localmente
- [ ] Sem conflitos com `main`
- [ ] Segue os padrões de código
- [ ] Documentação atualizada
- [ ] Mensagens de commit claras
- [ ] Mudanças são focadas

### Template de PR

```markdown
## 📝 Descrição

Breve descrição do que foi feito.

## 🎯 Tipo de Mudança

- [ ] Bug fix
- [ ] Nova feature
- [ ] Breaking change
- [ ] Documentação

## 🧪 Como Testar

Passo a passo para testar as mudanças.

## ✅ Checklist

- [ ] Código testado localmente
- [ ] Sem console.log deixado
- [ ] Documentação atualizada
- [ ] Commits bem descritos

## 📸 Screenshots (se aplicável)

Adicione capturas de tela se houver mudanças visuais.
```

---

## 🐛 Reportando Bugs

### Antes de Reportar

- Verifique se o bug já foi reportado
- Teste se é reproduzível
- Prepare um exemplo mínimo

### Como Reportar

1. Vá para a aba **Issues**
2. Clique em **New Issue**
3. Selecione o template **Bug Report**
4. Preencha todas as informações

### Informações Necessárias

```markdown
## Descrição do Bug

Descrição clara do que deu errado.

## Passos para Reproduzir

1. Ir para...
2. Clicar em...
3. Observar o erro...

## Comportamento Esperado

O que deveria acontecer.

## Comportamento Atual

O que está acontecendo.

## Ambiente

- Sistema: Windows/Mac/Linux
- Navegador: Chrome/Firefox/Safari
- Versão: 1.0.0
- Node.js: 18.x
```

---

## 💡 Sugestões de Features

### Antes de Sugerir

- Verifique se a feature não foi sugerida
- Seja específico e descritivo
- Explique o caso de uso

### Como Sugerir

1. Vá para a aba **Issues**
2. Clique em **New Issue**
3. Selecione o template **Feature Request**
4. Descreva detalhadamente

### Template de Feature

```markdown
## 📋 Descrição da Feature

Descrição clara da funcionalidade desejada.

## 🎯 Caso de Uso

Por que essa feature seria útil?

## 🚀 Solução Proposta

Descreva como você imagina que funcionaria.

## 🔄 Alternativas

Existem outras formas de resolver o problema?

## 📚 Contexto Adicional

Links, referências ou exemplos.
```

---

## 🧪 Testing

### Antes de Submeter um PR

```bash
# Backend
cd clinica-api
npm run build

# Frontend
cd clinica-frontend
npm run build
npm run lint
```

### Rodando Testes

```bash
# Quando testes forem implementados
npm test

# Com coverage
npm test -- --coverage
```

---

## 📚 Documentação

### Ao Adicionar uma Nova Feature

1. Atualize o README.md
2. Adicione exemplos de uso
3. Documente novos endpoints (Swagger)
4. Atualize o CHANGELOG.md

### Padrão de Documentação

````typescript
/**
 * Breve descrição da função
 *
 * Descrição detalhada se necessário.
 *
 * @param param1 - Descrição do parâmetro 1
 * @param param2 - Descrição do parâmetro 2
 * @returns Descrição do retorno
 * @throws Exceções que podem ser lançadas
 *
 * @example
 * ```typescript
 * const result = myFunction("value1", "value2");
 * console.log(result);
 * ```
 */
````

---

## ✅ Checklist Final

Antes de submeter seu PR, verifique:

- [ ] Fork está atualizado com `main`
- [ ] Branch está bem nomeada
- [ ] Código segue os padrões
- [ ] Sem console.log/debugger
- [ ] Sem arquivo `.env` commitado
- [ ] Testes passando
- [ ] Build sem erros
- [ ] Documentação atualizada
- [ ] Commits bem descritos
- [ ] PR tem boa descrição

---

## 🙏 Obrigado!

Agradecemos sua contribuição! Você está ajudando a tornar este projeto melhor.

Se tiver dúvidas, abra uma issue ou entre em contato com os mantenedores.

---

**Feliz Coding! 🚀**
