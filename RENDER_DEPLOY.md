# 🚀 Guia Completo: Deploy no Render (Banco + Backend + Frontend)

## 📊 Visão Geral da Arquitetura

```
Render Platform
├── PostgreSQL Database (Managed)
├── Backend API (Node.js + Express)
└── Frontend (React + Vite)
```

---

## 🔑 Pré-requisitos

- ✅ Conta no [Render.com](https://render.com)
- ✅ Repositório no GitHub (público)
- ✅ Git e Node.js instalados localmente
- ✅ Projeto confirmado com commits

**Verificar:**

```bash
cd /home/dgm/Desktop/unipe/2025.2
git log --oneline  # Deve mostrar commits
git remote -v       # Deve ter origin (GitHub)
```

---

## 📋 Passo 0: Preparar Código para Produção

### 0.1 Corrigir CORS no Backend

O backend está com CORS hardcoded para localhost. Vamos corrigir:

**Arquivo:** `api/src/index.ts`

```typescript
import express from "express";
import cors from "cors";
import "dotenv/config";
import routes from "./routes";
import { setupSwagger } from "./swagger";

const app = express();

// Configuração CORS - permite requisições do frontend em produção
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";

app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
setupSwagger(app);
app.use("", routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📡 CORS enabled for: ${CORS_ORIGIN}`);
});
```

### 0.2 Adicionar Variáveis de Produção

**Arquivo:** `api/.env.example`

```bash
# Render PostgreSQL (será fornecido pelo Render)
DATABASE_URL="postgresql://user:password@host:5432/database"

# Servidor
PORT=10000
NODE_ENV="production"

# CORS (seu frontend no Render)
CORS_ORIGIN="https://seu-frontend.onrender.com"

# Swagger
SWAGGER_HOST="sua-api.onrender.com"
SWAGGER_SCHEMES="https"
```

### 0.3 Adicionar Script de Build para Produção

**Arquivo:** `api/package.json` (adicionar ao scripts)

```json
{
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "prisma:generate": "npx prisma generate",
    "prisma:migrate": "npx prisma migrate deploy",
    "prisma:studio": "npx prisma studio",
    "seed": "npx tsx src/scripts/seedAll.ts",
    "render:build": "npm install && npm run prisma:generate && npm run build"
  }
}
```

### 0.4 Frontend - Configurar Variável de Ambiente

**Arquivo:** `frontend/.env.example`

```bash
VITE_API_URL=https://sua-api.onrender.com
```

**Arquivo:** `frontend/src/services/consultaService.ts` (e outros services)

Verifique que estão usando:

```typescript
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3333";
```

---

## 🗄️ Passo 1: Criar PostgreSQL Database no Render

### 1.1 Acessar Render Dashboard

1. Vá para [dashboard.render.com](https://dashboard.render.com)
2. Faça login com sua conta

### 1.2 Criar PostgreSQL Database

1. Clique em **"New +"** → **"PostgreSQL"**
2. Preencha:

   - **Name**: `clinica-db`
   - **Database Name**: `clinica`
   - **User**: `admin`
   - **Region**: Selecione mais próximo (ex: São Paulo, América do Sul)
   - **Plan**: Free (ou pago se necessário)

3. Clique em **"Create Database"**

**Aguarde 3-5 minutos** para o banco ser provisionado.

### 1.3 Guardar Connection String

Após criado, você verá uma tela com:

```
postgresql://admin:SENHA@dpg-xxxxx.onrender.com:5432/clinica
```

**⚠️ COPIE ESSA STRING** - você usará como `DATABASE_URL`

---

## 🛠️ Passo 2: Deploy do Backend (API)

### 2.1 Criar Web Service para Backend

1. No Render Dashboard, clique **"New +"** → **"Web Service"**
2. Selecione seu repositório GitHub
3. Preencha:

   | Campo             | Valor                                                               |
   | ----------------- | ------------------------------------------------------------------- |
   | **Name**          | `clinica-api`                                                       |
   | **Environment**   | Node                                                                |
   | **Region**        | Mesma do banco                                                      |
   | **Branch**        | main                                                                |
   | **Build Command** | `cd api && npm install && npm run prisma:generate && npm run build` |
   | **Start Command** | `cd api && npm start`                                               |
   | **Plan**          | Free                                                                |

4. Clique em **"Advanced"** para adicionar Pre-Deploy Command e Variáveis

### 2.2 Configurar Start Command com Migrations + Seed

⚠️ **Nota:** Pre-Deploy Command é pago. Usaremos Start Command em seu lugar!

Substitua o **Start Command** para:

```bash
cd api && npx prisma migrate deploy && npx tsx src/scripts/seedAll.ts && node dist/index.js
```

**O que isso faz:**

1. `npx prisma migrate deploy` - Aplica migrations ao banco
2. `npx tsx src/scripts/seedAll.ts` - Popula o banco com dados iniciais
3. `node dist/index.js` - Inicia a aplicação

**Isso garante que:**

- ✅ Banco é inicializado automaticamente
- ✅ Dados são inseridos antes da aplicação iniciar
- ✅ Funciona no Free Plan! 🎉

### 2.3 Adicionar Variáveis de Ambiente

Adicione cada uma individualmente:

| Chave          | Valor                                                                  |
| -------------- | ---------------------------------------------------------------------- |
| `DATABASE_URL` | `postgresql://admin:SENHA@dpg-xxxxx.onrender.com:5432/clinica`         |
| `NODE_ENV`     | `production`                                                           |
| `PORT`         | `10000`                                                                |
| `CORS_ORIGIN`  | `https://clinica-frontend.onrender.com` (temporário, atualizar depois) |

**Clique "Create Web Service"**

**Ordem de execução no Render:**

```
1. Build Command
   └─ npm install
   └─ npm run prisma:generate
   └─ npm run build
   └─ (aplicação fica pronta em dist/)

2. Start Command (EXECUTA TUDO!)
   └─ npx prisma migrate deploy
   └─ npx tsx src/scripts/seedAll.ts
   └─ node dist/index.js (servidor inicia)
```

### 2.4 Aguardar Deploy

- Render começará o build automático
- **Durante o deploy:**
  - Build Command executa (npm install, prisma generate, tsc)
  - Start Command executa (migrations, seed, servidor inicia) ⚡
- **Aguarde 10-15 minutos** para completar
- Você verá na tela quando estiver **"Live"**

✅ **Quando estiver "Live", o banco já estará populado com 48 registros!**

**Primeiras linhas dos logs devem mostrar:**

```
🚀 Starting application...
🗄️ Running migrations...
Prisma schema loaded from prisma/schema.prisma
Datasource "db": PostgreSQL database "clinica"

✓ No pending migrations to apply

🌱 Seeding database...
✅ 20 médicos criados
✅ 10 pacientes criados
✅ 3 secretários criados
✅ 15 consultas criadas

✅ Starting server...
🚀 Server is running on http://localhost:10000
📡 CORS enabled for: https://clinica-frontend.onrender.com
```

### 2.5 Verificar API

Após deployment completo e estar "Live":

```bash
# No terminal ou navegador
curl https://clinica-api.onrender.com/api/medicos
```

Deve retornar JSON com 20 médicos! ✅

---

## 🎨 Passo 3: Deploy do Frontend (React)

### 3.1 Criar Static Site para Frontend

1. No Render Dashboard, clique **"New +"** → **"Static Site"** (ou "Web Service")
2. Selecione seu repositório GitHub
3. Preencha:

   | Campo                 | Valor                                         |
   | --------------------- | --------------------------------------------- |
   | **Name**              | `clinica-frontend`                            |
   | **Region**            | Mesma do backend                              |
   | **Branch**            | main                                          |
   | **Build Command**     | `cd frontend && npm install && npm run build` |
   | **Publish Directory** | `frontend/dist`                               |

### 3.2 Adicionar Variáveis de Ambiente

Clique em **"Advanced"** → **"Add Environment Variable"**:

| Chave          | Valor                              |
| -------------- | ---------------------------------- |
| `VITE_API_URL` | `https://clinica-api.onrender.com` |

**Clique "Create Static Site"**

### 3.3 Aguardar Deploy

- Render fará build e deploy
- **Aguarde 3-5 minutos**
- Você receberá URL: `https://clinica-frontend.onrender.com`

---

## 🔄 Passo 4: Atualizar Configurações Cross-Site

### 4.1 Atualizar Backend com Frontend URL

1. Vá ao **Dashboard da API** → **Settings** → **Environment**
2. Edite `CORS_ORIGIN`:

   - De: `https://clinica-frontend.onrender.com`
   - Para: `https://clinica-frontend.onrender.com` (URL real do seu frontend)

3. Clique **"Save"** → Render fará redeploy automaticamente

### 4.2 Verificar Swagger (Documentação)

Após tudo deployado:

```
https://clinica-api.onrender.com/api-docs
```

Deve abrir Swagger UI com todos os endpoints! 📚

---

## ✅ Passo 5: Verificar Deploy Completo

### 5.1 Testar Backend

```bash
# Lista de médicos
curl https://clinica-api.onrender.com/api/medicos

# Lista de pacientes
curl https://clinica-api.onrender.com/api/pacientes

# Health check
curl https://clinica-api.onrender.com/health
```

### 5.2 Acessar Frontend

1. Abra no navegador: `https://clinica-frontend.onrender.com`
2. Tela de login deve aparecer
3. Tente fazer login (dados do seed)
4. Navegue entre as páginas

### 5.3 Testar Fluxo Completo

**Credenciais de teste (do seed):**

```
Email: marcela.silva@clinica.com
Senha: senha123
```

**Teste:**

- ✅ Login com credenciais
- ✅ Listar pacientes
- ✅ Criar novo paciente
- ✅ Listar consultas
- ✅ Criar nova consulta
- ✅ Editar paciente
- ✅ Deletar paciente

---

## 🔧 Troubleshooting

### ❌ Erro: "Cannot find module '@prisma/client'"

**Solução:**

1. No Shell da API:

```bash
npm install --save @prisma/client
```

2. Redeploy

### ❌ Erro: "Client is unable to connect" (Banco)

**Verificar:**

1. `DATABASE_URL` está correto
2. PostgreSQL está provisionado
3. No Shell:

```bash
npx prisma db push
```

### ❌ Erro CORS: "Access to XMLHttpRequest blocked"

**Solução:**

1. Verifique `CORS_ORIGIN` na API (deve ser URL exata do frontend)
2. Redeploy API
3. Limpe cache do navegador (Ctrl+Shift+Del)

### ❌ Frontend não conecta à API

**Verificar:**

1. DevTools (F12) → Console
2. Qual URL está tentando acessar?
3. Confirme que `VITE_API_URL` está correto

**Redeploy frontend:**

```bash
# No Render Dashboard → Frontend → Deployments
# Clique em último deployment → "Redeploy"
```

### ❌ Seed falhou

**Solução:**

1. No Shell da API, execute manualmente:

```bash
npx prisma migrate deploy
npx prisma db push
npx tsx src/scripts/seedAll.ts
```

---

## 📊 URLs Finais

Após tudo deployado, você terá:

```
🌐 Frontend: https://clinica-frontend.onrender.com
📡 API: https://clinica-api.onrender.com
📚 Swagger: https://clinica-api.onrender.com/api-docs
🗄️ Database: dpg-xxxxx.onrender.com:5432
```

---

## 🔄 Fluxo Futuro: Atualizar Código

Após deploy, qualquer mudança é automática:

```bash
# 1. No seu computador, faça mudanças
nano api/src/index.ts

# 2. Commit e push
git add .
git commit -m "fix: alguma correção"
git push origin main

# 3. Render detecta push automaticamente
# 4. Faz redeploy do backend
```

**Mesma coisa para frontend:**

```bash
git add .
git commit -m "feat: nova funcionalidade"
git push origin main
```

---

## 💾 Backup e Dados

### Backup de Dados

No Render Dashboard → PostgreSQL → Backups:

- Backups automáticos diários (plano pago)
- Backups manuais sempre disponíveis

### Resetar Banco (⚠️ Cuidado!)

```bash
# No Shell da API:
npx prisma migrate reset --force
npx prisma db seed
```

---

## 🎯 Otimizações Futuras

1. **Custom Domain**

   - Compre domínio
   - Configure DNS
   - Atribua ao Render

2. **SSL/TLS**

   - Render fornece automaticamente

3. **Upgrade de Plano**

   - Se app crescer
   - Planos Starter/Professional

4. **CI/CD Melhorado**
   - GitHub Actions
   - Testes automáticos
   - Deploy condicional

---

## 📞 Suporte

- [Render Docs](https://render.com/docs)
- [Prisma Deployment](https://www.prisma.io/docs/orm/prisma-client/deployment/deploy)
- [PostgreSQL Render](https://render.com/docs/postgresql)

---

**🎉 Parabéns! Sua aplicação está em produção no Render!**
