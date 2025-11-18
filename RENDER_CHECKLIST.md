# ✅ RENDER DEPLOYMENT - Checklist Executivo

## 📋 Resumo do Processo

Deploy completo em **5 passos principais** (tempo estimado: 30-45 minutos)

```
Passo 0: Preparar código ...................... 5 min
Passo 1: PostgreSQL Database .................. 5 min (setup) + 5 min (espera)
Passo 2: Backend (API) ....................... 10 min (setup) + 5 min (espera)
Passo 3: Frontend (React) .................... 5 min (setup) + 5 min (espera)
Passo 4: Configurações Cross-Site ........... 3 min
Passo 5: Verificações ....................... 5 min
─────────────────────────────────────────────
Total: ~45 minutos (tempo de espera incluso)
```

---

## 🚀 Quick Start (5 Passos Essenciais)

### ✅ Passo 0: Código Pronto ✓

- [x] Backend atualizado com CORS dinâmico
- [x] Arquivo `.env.production.example` criado
- [x] Package.json com scripts de produção
- [x] Documentação: `RENDER_DEPLOY.md`

**Próximo:** Fazer login no Render

---

### ✅ Passo 1: PostgreSQL Database

```
1. Dashboard Render → "New +" → "PostgreSQL"
2. Name: clinica-db
3. User: admin
4. Plan: Free
5. Clique "Create"
6. COPIAR a Connection String (demora 5 min)
```

**Resultado:** String como `postgresql://admin:SENHA@dpg-xxxxx...`

---

### ✅ Passo 2: Backend (API)

```
1. "New +" → "Web Service"
2. Selecionar repositório GitHub
3. Name: clinica-api
4. Build: cd api && npm install && npm run prisma:generate && npm run build
5. Start: cd api && npm start
6. Advanced → Adicionar variáveis:
   - DATABASE_URL: [String copiada do PostgreSQL]
   - NODE_ENV: production
   - PORT: 10000
   - CORS_ORIGIN: https://clinica-frontend.onrender.com
7. Clique "Create"
8. Aguarde deploy (5-10 min)
9. Shell → Execute:
   - npx prisma migrate deploy
   - npx tsx src/scripts/seedAll.ts
```

**Verificar:** `curl https://clinica-api.onrender.com/api/medicos`

---

### ✅ Passo 3: Frontend (React)

```
1. "New +" → "Static Site"
2. Selecionar repositório
3. Name: clinica-frontend
4. Build: cd frontend && npm install && npm run build
5. Publish: frontend/dist
6. Advanced → Variáveis:
   - VITE_API_URL: https://clinica-api.onrender.com
   - VITE_API_TIMEOUT: 10000
   - VITE_ENV: production
7. Clique "Create"
8. Aguarde deploy (3-5 min)
```

**Verificar:** Abra `https://clinica-frontend.onrender.com`

---

### ✅ Passo 4: Sincronizar URLs

1. Volte à **API** → Settings → Environment
2. Edite `CORS_ORIGIN` com URL real do frontend
3. Salve (redeploy automático)

---

### ✅ Passo 5: Teste Final

- [ ] Tela de login aparece
- [ ] Login com `marcela.silva@clinica.com` / `senha123`
- [ ] Listar pacientes funciona
- [ ] Criar paciente funciona
- [ ] Swagger funciona: `https://clinica-api.onrender.com/api-docs`

---

## 📊 Arquitetura Final

```
┌─────────────────────────────────────────────┐
│           Render Platform                   │
├─────────────────────────────────────────────┤
│                                             │
│  ┌──────────────────────────────────────┐  │
│  │ Frontend (Static Site)               │  │
│  │ https://clinica-frontend.onrender.com │  │
│  │ (React + Vite)                       │  │
│  └──────────────┬───────────────────────┘  │
│                 │ HTTPS                    │
│                 ▼                          │
│  ┌──────────────────────────────────────┐  │
│  │ Backend (Web Service - Node.js)      │  │
│  │ https://clinica-api.onrender.com     │  │
│  │ (Express + TypeScript)               │  │
│  └──────────────┬───────────────────────┘  │
│                 │ SQL                      │
│                 ▼                          │
│  ┌──────────────────────────────────────┐  │
│  │ PostgreSQL Database                  │  │
│  │ dpg-xxxxx.onrender.com               │  │
│  └──────────────────────────────────────┘  │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 🔑 Credenciais de Teste

Após deploy com seed:

```
Email:   marcela.silva@clinica.com
Senha:   senha123

Ou qualquer paciente criado:
- João Silva
- Maria Santos
- Pedro Oliveira
... (10 total no seed)
```

---

## 🌐 URLs Finais

Após deployment bem-sucedido:

| Recurso | URL |
|---------|-----|
| **Frontend** | https://clinica-frontend.onrender.com |
| **API** | https://clinica-api.onrender.com |
| **Swagger Docs** | https://clinica-api.onrender.com/api-docs |
| **Database** | dpg-xxxxx.onrender.com:5432 |

---

## ⚡ Fluxo de Atualizações (Futura)

Após deployment, o fluxo é automático:

```bash
# 1. Fazer mudanças localmente
nano api/src/index.ts

# 2. Commit e push
git add .
git commit -m "fix: alguma correção"
git push origin main

# 3. Render detecta automaticamente
# 4. Faz rebuild e redeploy
# 5. Aplicação atualizada!
```

**Sem necessidade de ações manuais no Render!** ✨

---

## 🆘 Troubleshooting Rápido

| Erro | Solução |
|------|---------|
| Conexão CORS bloqueada | Verifique `CORS_ORIGIN` na API |
| Frontend vazio | Limpe cache (Ctrl+Shift+Del) |
| API retorna 500 | Verifique Shell → logs |
| Banco não encontrado | Regenere CONNECTION_STRING |
| Seed falhou | Execute manualmente no Shell |

---

## 📚 Referências Rápidas

- **Documentação Completa:** `RENDER_DEPLOY.md`
- **Backend Config:** `api/.env.production.example`
- **Frontend Config:** `frontend/.env.example`
- **Scripts:** Veja `api/package.json`

---

## ✨ Resumo Final

| Item | Status |
|------|--------|
| Código preparado | ✅ |
| Documentação | ✅ |
| Scripts de build | ✅ |
| Exemplos .env | ✅ |
| Ready para Render | ✅ |

**Você está 100% pronto para fazer deploy no Render!** 🚀

---

**Próximo passo:** Abra `RENDER_DEPLOY.md` para começar!
