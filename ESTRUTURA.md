# 📦 Estrutura de Arquivos de Configuração

Este documento descreve todos os arquivos de configuração e documentação do projeto.

## 🗂️ Arquivos na Raiz do Projeto

### 📋 Documentação

| Arquivo             | Descrição                        |
| ------------------- | -------------------------------- |
| **README.md**       | Documentação completa do projeto |
| **CONTRIBUTING.md** | Guia para contribuidores         |
| **CHANGELOG.md**    | Histórico de mudanças e versões  |
| **LICENSE**         | Licença MIT                      |

### ⚙️ Configuração

| Arquivo               | Descrição                                      |
| --------------------- | ---------------------------------------------- |
| **.gitignore**        | Padrões de arquivos a ignorar no Git           |
| **.gitignore-global** | Gitignore global simplificado                  |
| **.editorconfig**     | Configurações de editor (indent, charset, etc) |
| **.prettierrc**       | Configuração de formatação de código           |
| **.prettierignore**   | Arquivos a ignorar no Prettier                 |

---

## 🏗️ Backend (clinica-api)

### 📁 Estrutura Principal

```
clinica-api/
├── src/
│   ├── controllers/        # Controladores de requisições
│   ├── services/          # Lógica de negócio
│   ├── routes/            # Definição de rotas
│   ├── middlewares/       # Middlewares de validação
│   ├── schemas/           # Schemas Zod
│   ├── database/          # Configuração Prisma
│   ├── shared/            # Utilitários e constantes
│   ├── scripts/           # Scripts auxiliares (seed, etc)
│   └── index.ts           # Ponto de entrada
├── prisma/
│   ├── schema.prisma      # Modelo de dados
│   └── migrations/        # Histórico de migrações
├── dist/                  # Build de produção (git ignored)
├── node_modules/          # Dependências (git ignored)
├── package.json           # Dependências e scripts
├── tsconfig.json          # Configuração TypeScript
├── .env                   # Variáveis de ambiente (git ignored)
└── .env.example           # Exemplo de .env
```

### 📄 Arquivos Importantes

| Arquivo                  | Propósito                           |
| ------------------------ | ----------------------------------- |
| **.env**                 | Variáveis de ambiente (git ignored) |
| **.env.example**         | Exemplo de configuração             |
| **package.json**         | Dependências e scripts npm          |
| **tsconfig.json**        | Configuração TypeScript             |
| **prisma/schema.prisma** | Modelo de dados                     |

---

## 🎨 Frontend (clinica-frontend)

### 📁 Estrutura Principal

```
clinica-frontend/
├── src/
│   ├── components/        # Componentes React
│   ├── pages/            # Páginas da aplicação
│   ├── hooks/            # Custom hooks
│   ├── services/         # Chamadas à API
│   ├── schemas/          # Schemas de validação
│   ├── types/            # Tipos TypeScript
│   ├── shared/           # Constantes e utilitários
│   ├── App.tsx           # Componente raiz
│   └── main.tsx          # Ponto de entrada
├── public/               # Arquivos estáticos
├── dist/                 # Build de produção (git ignored)
├── node_modules/         # Dependências (git ignored)
├── package.json          # Dependências e scripts
├── tsconfig.json         # Configuração TypeScript
├── tsconfig.app.json     # Configuração TypeScript (app)
├── vite.config.ts        # Configuração Vite
├── .env.local            # Variáveis de ambiente (git ignored)
└── .env.example          # Exemplo de configuração
```

### 📄 Arquivos Importantes

| Arquivo            | Propósito                           |
| ------------------ | ----------------------------------- |
| **.env.local**     | Variáveis de ambiente (git ignored) |
| **.env.example**   | Exemplo de configuração             |
| **package.json**   | Dependências e scripts npm          |
| **tsconfig.json**  | Configuração TypeScript             |
| **vite.config.ts** | Configuração do Vite                |
| **index.html**     | HTML principal                      |

---

## 🐳 Docker

### Arquivo Principal

| Arquivo                | Descrição                  |
| ---------------------- | -------------------------- |
| **docker-compose.yml** | Orquestração do PostgreSQL |

**Serviços:**

- PostgreSQL 15+
- Porta: 5433
- Usuário: admin
- Senha: admin
- Banco: clinica

---

## 📝 Variáveis de Ambiente

### Backend (.env)

```env
DATABASE_URL="postgresql://admin:admin@localhost:5433/clinica"
PORT=3333
NODE_ENV="development"
```

### Frontend (.env.local)

```env
VITE_API_URL="http://localhost:3333"
VITE_API_TIMEOUT=10000
```

---

## 🔧 Scripts Disponíveis

### Backend

```bash
npm run dev              # Desenvolvimento com hot reload
npm run build            # Build para produção
npm start                # Inicia servidor em produção
npx prisma generate      # Gera Prisma Client
npx prisma migrate dev   # Executa migrações
npx prisma studio       # Abre Prisma Studio (GUI)
npx tsx src/scripts/seedMedicos.ts  # Popula com médicos
```

### Frontend

```bash
npm run dev              # Desenvolvimento com hot reload
npm run build            # Build para produção
npm run preview          # Visualiza build
npm run lint             # Executa linter
```

---

## 📋 Checklist de Configuração

Ao clonar o projeto:

- [ ] Clone o repositório
- [ ] Instale Docker e Docker Compose
- [ ] Copie `.env.example` para `.env` (backend)
- [ ] Copie `.env.example` para `.env.local` (frontend)
- [ ] Execute `docker-compose up -d` (inicia PostgreSQL)
- [ ] No backend: `npm install && npx prisma migrate dev`
- [ ] No frontend: `npm install`
- [ ] Inicie com `npm run dev` em cada pasta

---

## 🎯 Padrões de Nomeclatura

### Branches

```
feature/    - Nova funcionalidade
fix/        - Correção de bug
docs/       - Documentação
refactor/   - Refatoração
test/       - Testes
chore/      - Tarefas de manutenção
```

### Commits

```
feat: descrição
fix: descrição
docs: descrição
refactor: descrição
test: descrição
chore: descrição
```

---

## 📚 Documentação

- **README.md** - Documentação principal do projeto
- **CONTRIBUTING.md** - Como contribuir
- **CHANGELOG.md** - Histórico de mudanças
- **API Docs** - Swagger em `/api-docs`
- **Inline Docs** - JSDoc em componentes e serviços

---

## 🔐 Segurança

### Arquivos Ignorados pelo Git

- `.env` - Variáveis sensíveis
- `node_modules/` - Dependências
- `.DS_Store` - Arquivos do sistema
- `dist/` - Build de produção
- `coverage/` - Testes

### Nunca Commite

- ❌ Tokens e chaves secretas
- ❌ Senhas em texto plano
- ❌ Arquivos de configuração sensível
- ❌ `node_modules/`
- ❌ Arquivos de build

### Sempre Commite

- ✅ `.env.example` - Modelo de configuração
- ✅ `package.json` - Dependências
- ✅ `tsconfig.json` - Configuração TS
- ✅ Documentação
- ✅ Código fonte

---

## 🚀 Deploy

Para deploy em produção:

1. Atualize variáveis de ambiente
2. Execute `npm run build` em ambas as pastas
3. Configure certificados SSL/TLS
4. Use gerenciador de processos (PM2, systemd, etc)
5. Configure reverse proxy (nginx, Apache)
6. Ative HTTPS obrigatório

---

## 📞 Suporte

Dúvidas sobre arquivos de configuração?

1. Veja README.md
2. Veja CONTRIBUTING.md
3. Abra uma issue no GitHub
4. Consulte a documentação específica de cada tool

---

**Última atualização:** Novembro 2025
