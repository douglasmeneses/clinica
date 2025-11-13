# 🚀 Quick Start Guide

## ⚡ Comandos Rápidos

```bash
# 1. Clone e configure
git clone https://github.com/douglasmeneses/clinica-api.git
cd clinica-api
npm run setup

# 2. Inicie o banco
npm run docker:up

# 3. Rode a aplicação
npm run dev
```

## 🔗 Links Importantes

- **API**: http://localhost:3333
- **Swagger**: http://localhost:3333/api-docs
- **Prisma Studio**: `npm run prisma:studio`

## 📦 Scripts Disponíveis

```bash
npm run dev              # Desenvolvimento com hot reload
npm run build           # Build para produção
npm run start           # Iniciar produção
npm run setup           # Setup completo (install + generate + migrate)
npm run docker:up       # Subir banco PostgreSQL
npm run docker:down     # Parar banco PostgreSQL
npm run prisma:generate # Gerar Prisma Client
npm run prisma:migrate  # Executar migrações
npm run prisma:studio   # Abrir Prisma Studio
```

## 🧪 Teste Rápido

```bash
# Criar um secretário
curl -X POST http://localhost:3333/secretarios \
  -H "Content-Type: application/json" \
  -d '{"nome":"João","email":"joao@teste.com","senha":"123456","telefone":"11999999999"}'

# Listar secretários
curl http://localhost:3333/secretarios
```

## ❗ Problemas Comuns

- **Porta 5432 ocupada**: Use porta 5433 (já configurado)
- **Prisma Client não encontrado**: `npm run prisma:generate`
- **Erro de migração**: `npm run prisma:migrate`
- **Container não sobe**: `npm run docker:down && npm run docker:up`
