# 🏥 Clínica Backend

Backend Node.js profissional para o Sistema de Gerenciamento de Clínica Médica.

## 📚 Documentação Completa

Veja o **[README.md principal](../README.md)** na raiz do projeto para documentação completa, incluindo:

- 🏗️ Arquitetura completa
- 🛠️ Stack tecnológico
- 🚀 Guia de instalação e setup
- 📚 Documentação de endpoints
- 🧪 Testes e exemplos
- 🔒 Segurança

## ⚡ Quick Start

```bash
# Instalar dependências
npm install

# Gerar Prisma Client
npx prisma generate

# Executar migrações
npx prisma migrate dev

# Iniciar desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar em produção
npm start
```

## 📂 Estrutura

```
src/
├── controllers/      # Controle de requisições
├── services/        # Lógica de negócio
├── routes/          # Definição de rotas
├── middlewares/     # Middlewares de validação
├── schemas/         # Schemas Zod
├── database/        # Configuração Prisma
├── shared/          # Utilitários e constantes
├── scripts/         # Scripts auxiliares
└── index.ts         # Ponto de entrada
```

## 🔌 Endpoints Principais

- `POST /login` - Autenticação
- `GET/POST/PUT/DELETE /secretarios` - Gestão de secretários
- `GET/POST/PUT/DELETE /medicos` - Gestão de médicos
- `GET/POST/PUT/DELETE /pacientes` - Gestão de pacientes
- `GET/POST/PUT/DELETE /consultas` - Gestão de consultas
- `GET /api-docs` - Swagger UI

## 🎯 Funcionalidades

✅ CRUD completo para todas as entidades  
✅ Validação robusta com Zod  
✅ Documentação com Swagger  
✅ Banco PostgreSQL com Prisma  
✅ Error handling centralizado  
✅ Logging estruturado  
✅ Pronto para produção

## 🗄️ Banco de Dados

**Host:** localhost  
**Port:** 5433  
**Usuário:** admin  
**Senha:** admin  
**Banco:** clinica

## 📊 Modelos

- **Secretario** - Usuários do sistema
- **Medico** - Médicos cadastrados
- **Paciente** - Pacientes da clínica
- **Consulta** - Consultas agendadas

---

**Para mais informações, veja o [README.md principal](../README.md)**
