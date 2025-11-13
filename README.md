# 🏥 Sistema de Gerenciamento de Clínica Médica

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-336791)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

Um sistema completo e profissional para gerenciamento de clínicas médicas, desenvolvido com tecnologias modernas e melhores práticas de desenvolvimento.

## 📋 Visão Geral

O **Sistema de Gerenciamento de Clínica Médica** é uma aplicação full-stack que permite:

- ✅ Gerenciar secretários e controle de acesso
- ✅ Cadastro e gestão de médicos com especialidades
- ✅ Controle completo de pacientes
- ✅ Agendamento e gerenciamento de consultas
- ✅ Busca avançada e filtros em tempo real
- ✅ Interface intuitiva e responsiva
- ✅ API REST documentada com Swagger

---

## 🏗️ Arquitetura

### Estrutura do Projeto

```
.
├── clinica-api/              # Backend (Node.js + TypeScript)
│   ├── src/
│   │   ├── controllers/      # Camada de controle de requisições
│   │   ├── services/         # Lógica de negócio
│   │   ├── routes/           # Definição de rotas
│   │   ├── middlewares/      # Middlewares de validação
│   │   ├── schemas/          # Schemas Zod de validação
│   │   ├── database/         # Configuração do Prisma
│   │   └── index.ts          # Ponto de entrada
│   ├── prisma/
│   │   ├── schema.prisma     # Modelo de dados
│   │   └── migrations/       # Histórico de migrações
│   └── package.json
│
├── clinica-frontend/         # Frontend (React + TypeScript)
│   ├── src/
│   │   ├── components/       # Componentes React reutilizáveis
│   │   ├── pages/            # Páginas da aplicação
│   │   ├── hooks/            # Custom hooks
│   │   ├── services/         # Chamadas à API
│   │   ├── schemas/          # Schemas de validação
│   │   ├── types/            # Tipos TypeScript
│   │   ├── App.tsx           # Componente raiz
│   │   └── main.tsx          # Ponto de entrada
│   └── package.json
│
└── docker-compose.yml        # Orquestração de containers
```

---

## 🛠️ Stack Tecnológico

### Backend

| Tecnologia     | Versão | Propósito                 |
| -------------- | ------ | ------------------------- |
| **Node.js**    | 18+    | Runtime JavaScript        |
| **Express.js** | 5.1    | Framework web             |
| **TypeScript** | 5.9    | Tipagem estática          |
| **Prisma**     | 6.16   | ORM moderno               |
| **PostgreSQL** | Latest | Banco de dados relacional |
| **Zod**        | 4.1    | Validação de esquemas     |
| **Swagger**    | 6.2    | Documentação da API       |
| **bcryptjs**   | 3.0    | Hash seguro de senhas     |

### Frontend

| Tecnologia       | Versão | Propósito          |
| ---------------- | ------ | ------------------ |
| **React**        | 19     | Biblioteca UI      |
| **TypeScript**   | 5.8    | Tipagem estática   |
| **Vite**         | 7.1    | Build tool moderno |
| **Material-UI**  | 7.3    | Componentes UI     |
| **Axios**        | 1.12   | Cliente HTTP       |
| **React Router** | 6.30   | Roteamento         |
| **Zod**          | 4.1    | Validação          |

---

## 🚀 Guia de Instalação e Setup

### 📋 Pré-requisitos

- **Node.js** 18 ou superior
- **npm** 10+ ou **yarn** 4+
- **Docker** e **Docker Compose**
- **Git**

### 1️⃣ Clone o Repositório

```bash
git clone https://github.com/douglasmeneses/clinica-api.git
cd clinica-api
```

### 2️⃣ Configure o Banco de Dados com Docker

```bash
# Inicie os containers (PostgreSQL)
docker-compose up -d

# Verifique se está rodando
docker ps
```

**Credenciais do banco:**

- Host: `localhost`
- Porta: `5433`
- Usuário: `admin`
- Senha: `admin`
- Banco: `clinica`

### 3️⃣ Configure o Backend

```bash
cd clinica-api

# Instale dependências
npm install

# Gere o Prisma Client
npx prisma generate

# Execute migrações
npx prisma migrate dev

# (Opcional) Popule com dados de exemplo
npx tsx src/scripts/seedMedicos.ts
```

**Variáveis de ambiente** (`.env` já configurado):

```env
DATABASE_URL="postgresql://admin:admin@localhost:5433/clinica"
PORT=3333
```

**Inicie o servidor:**

```bash
npm run dev
```

Servidor rodando em: **http://localhost:3333**

Swagger disponível em: **http://localhost:3333/api-docs**

### 4️⃣ Configure o Frontend

```bash
cd ../clinica-frontend

# Instale dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Aplicação disponível em: **http://localhost:5173**

---

## 📚 Documentação da API

### 🔗 Endpoints Principais

#### 🔐 Autenticação

```http
POST /login
Content-Type: application/json

{
  "email": "secretario@clinica.com",
  "senha": "senha123"
}
```

#### 👤 Secretários

| Método   | Endpoint           | Descrição                   |
| -------- | ------------------ | --------------------------- |
| `POST`   | `/secretarios`     | Criar novo secretário       |
| `GET`    | `/secretarios`     | Listar todos os secretários |
| `GET`    | `/secretarios/:id` | Buscar secretário por ID    |
| `PUT`    | `/secretarios/:id` | Atualizar secretário        |
| `DELETE` | `/secretarios/:id` | Remover secretário          |

**Exemplo:**

```bash
curl -X POST http://localhost:3333/secretarios \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Ana Silva",
    "email": "ana@clinica.com",
    "senha": "senha123",
    "telefone": "11999999999"
  }'
```

#### 🏥 Médicos

| Método   | Endpoint       | Descrição               |
| -------- | -------------- | ----------------------- |
| `POST`   | `/medicos`     | Criar novo médico       |
| `GET`    | `/medicos`     | Listar todos os médicos |
| `GET`    | `/medicos/:id` | Buscar médico por ID    |
| `PUT`    | `/medicos/:id` | Atualizar médico        |
| `DELETE` | `/medicos/:id` | Remover médico          |

**Exemplo:**

```bash
curl -X POST http://localhost:3333/medicos \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Dr. João Santos",
    "email": "joao@clinica.com",
    "crm": "CRM/SP 123456",
    "especialidade": "Cardiologia"
  }'
```

#### 👥 Pacientes

| Método   | Endpoint         | Descrição                 |
| -------- | ---------------- | ------------------------- |
| `POST`   | `/pacientes`     | Criar novo paciente       |
| `GET`    | `/pacientes`     | Listar todos os pacientes |
| `GET`    | `/pacientes/:id` | Buscar paciente por ID    |
| `PUT`    | `/pacientes/:id` | Atualizar paciente        |
| `DELETE` | `/pacientes/:id` | Remover paciente          |

**Exemplo:**

```bash
curl -X POST http://localhost:3333/pacientes \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Maria Oliveira",
    "email": "maria@email.com",
    "cpf": "12345678901",
    "telefone": "11777777777",
    "dataNascimento": "1990-01-15"
  }'
```

#### 📅 Consultas

| Método   | Endpoint         | Descrição                 |
| -------- | ---------------- | ------------------------- |
| `POST`   | `/consultas`     | Agendar nova consulta     |
| `GET`    | `/consultas`     | Listar todas as consultas |
| `GET`    | `/consultas/:id` | Buscar consulta por ID    |
| `PUT`    | `/consultas/:id` | Reagendar consulta        |
| `DELETE` | `/consultas/:id` | Cancelar consulta         |

**Exemplo:**

```bash
curl -X POST http://localhost:3333/consultas \
  -H "Content-Type: application/json" \
  -d '{
    "dataHora": "2025-12-25T10:00:00Z",
    "motivo": "Checkup anual",
    "pacienteId": 1,
    "medicoId": 1
  }'
```

### 📖 Swagger UI

Acesse a documentação interativa completa da API em:

```
http://localhost:3333/api-docs
```

---

## 🎨 Funcionalidades do Frontend

### 🔐 Autenticação

- Login seguro com validação de credenciais
- Feedback visual em tempo real
- Redirecionamento automático para dashboard

### 📊 Dashboard

- Visão geral do sistema
- Atalhos para funcionalidades principais
- Interface intuitiva e responsiva

### 👥 Gestão de Pacientes

- CRUD completo (Criar, Ler, Atualizar, Deletar)
- Busca em tempo real por nome, email, CPF ou telefone
- Validação de dados com Zod
- Feedback visual com Snackbar
- Listagem com scroll horizontal em móbil

### 🏥 Gestão de Consultas

- Agendamento de novas consultas
- Reagendamento de consultas existentes
- Filtros por período (Hoje, Próximos 7 dias, Este mês, Futuras, Passadas)
- Busca avançada por paciente, médico, especialidade ou motivo
- Debounce em busca para otimização
- Contador de resultados

### 🎯 Recursos de UX

- **Debounce de 300ms** em buscas para melhor performance
- **Busca em tempo real** com filtros combinados
- **Validação em tempo real** dos formulários
- **Tema claro/escuro** com Material-UI
- **Responsivo** em todos os tamanhos de tela
- **Acessibilidade** com bom suporte de navegação

---

## 🧪 Testando a Aplicação

### 1. Via Swagger UI (Recomendado)

1. Acesse: **http://localhost:3333/api-docs**
2. Clique em qualquer endpoint
3. Clique em "Try it out"
4. Preencha os dados conforme o schema
5. Clique em "Execute"

### 2. Via Frontend

1. Acesse: **http://localhost:5173**
2. Faça login com suas credenciais
3. Use as funcionalidades através da interface
4. Todos os endpoints estarão disponíveis

### 3. Via cURL

```bash
# Criar um paciente
curl -X POST http://localhost:3333/pacientes \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "email": "joao@email.com",
    "cpf": "98765432101",
    "telefone": "11988888888",
    "dataNascimento": "1995-05-20"
  }'

# Listar médicos
curl http://localhost:3333/medicos

# Criar uma consulta
curl -X POST http://localhost:3333/consultas \
  -H "Content-Type: application/json" \
  -d '{
    "dataHora": "2025-12-20T14:30:00Z",
    "motivo": "Consulta de rotina",
    "pacienteId": 1,
    "medicoId": 1
  }'
```

---

## 📊 Modelo de Dados

### Diagrama ER

```
┌─────────────────┐
│   Secretario    │
├─────────────────┤
│ id (PK)         │
│ nome            │
│ email (UNIQUE)  │
│ senha           │
│ telefone        │
└─────────────────┘

┌─────────────────┐          ┌──────────────────┐
│     Medico      │◄────────│    Consulta      │
├─────────────────┤          ├──────────────────┤
│ id (PK)         │          │ id (PK)          │
│ nome            │          │ dataHora         │
│ email (UNIQUE)  │          │ motivo           │
│ crm (UNIQUE)    │          │ medicoId (FK)    │
│ especialidade   │          │ pacienteId (FK)  │
└─────────────────┘          └──────────────────┘
                                      ▲
                                      │
                                      │
                             ┌────────────────┐
                             │    Paciente    │
                             ├────────────────┤
                             │ id (PK)        │
                             │ nome           │
                             │ email (UNIQUE) │
                             │ cpf (UNIQUE)   │
                             │ telefone       │
                             │ dataNascimento │
                             └────────────────┘
```

### Validações de Dados

| Campo               | Validação              | Exemplo                |
| ------------------- | ---------------------- | ---------------------- |
| **Email**           | Formato válido, único  | `usuario@clinica.com`  |
| **CPF**             | 11 dígitos, único      | `12345678901`          |
| **CRM**             | String única           | `CRM/SP 123456`        |
| **Telefone**        | 10-15 caracteres       | `11999999999`          |
| **Data Nascimento** | Data válida no passado | `1990-05-15`           |
| **Data Consulta**   | DateTime no futuro     | `2025-12-25T10:00:00Z` |

---

## 📦 Scripts Disponíveis

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

### Docker

```bash
docker-compose up -d     # Inicia containers em background
docker-compose down      # Para e remove containers
docker-compose logs -f   # Visualiza logs em tempo real
```

---

## 🔒 Segurança

### ✅ Medidas Implementadas

- ✅ **Senhas com Hash** - Bcryptjs com 10 rounds
- ✅ **Validação Robusta** - Zod schema validation
- ✅ **Tipagem Forte** - TypeScript em toda a codebase
- ✅ **Proteção CORS** - Configurado para localhost
- ✅ **Validação de Entrada** - Sanitização em middlewares

### 🔐 Recomendações para Produção

- [ ] Adicionar JWT authentication
- [ ] Implementar rate limiting
- [ ] Adicionar HTTPS/SSL
- [ ] Configurar CORS adequadamente
- [ ] Usar variáveis de ambiente seguras
- [ ] Implementar logging de auditoria
- [ ] Adicionar testes de segurança
- [ ] Configurar firewall

---

## 🐛 Solução de Problemas

### ❌ Erro: "Port 5433 already in use"

**Solução:**

```bash
# Parar containers existentes
docker-compose down

# Iniciar novamente
docker-compose up -d
```

### ❌ Erro: "Cannot find module '../generated/prisma'"

**Solução:**

```bash
cd clinica-api
npx prisma generate
```

### ❌ Erro: "Credenciais de banco inválidas"

**Verificar:**

1. Arquivo `.env` configurado corretamente
2. Container PostgreSQL está rodando: `docker ps`
3. Banco `clinica` foi criado

### ❌ Frontend não conecta na API

**Verificar:**

1. Backend está rodando: `http://localhost:3333`
2. Verifique o console do navegador (DevTools)
3. Confirme que CORS está habilitado

### ❌ Migrações do Prisma falham

**Solução:**

```bash
cd clinica-api
npx prisma migrate reset --force  # ⚠️ Deleta dados!
```

---

## 📈 Performance e Otimizações

### Backend

- ✅ Paginação de dados (pronto para implementação)
- ✅ Índices de banco otimizados
- ✅ Queries eficientes com Prisma
- ✅ Error handling centralizado
- ✅ Logging estruturado

### Frontend

- ✅ Debounce em buscas (300ms)
- ✅ Memoização com useMemo
- ✅ useCallback para callbacks estáveis
- ✅ Lazy loading de imagens
- ✅ Code splitting pronto

---

## 📋 Dados de Exemplo

### Médicos Pré-carregados (20 especialidades)

Ao executar `npx tsx src/scripts/seedMedicos.ts`, você terá:

- Cardiologia, Pediatria, Ortopedia, Dermatologia
- Neurologia, Ginecologia, Urologia, Endocrinologia
- Gastroenterologia, Oftalmologia, Psiquiatria, Pneumologia
- Reumatologia, Oncologia, Cirurgia Geral e mais...

---

## 🤝 Contribuindo

1. **Fork** o projeto
2. Crie uma branch para sua feature: `git checkout -b feature/AmazingFeature`
3. **Commit** suas mudanças: `git commit -m 'Add some AmazingFeature'`
4. **Push** para a branch: `git push origin feature/AmazingFeature`
5. Abra um **Pull Request**

## 📝 Checklist de Desenvolvimento

- [x] CRUD de Secretários
- [x] CRUD de Médicos
- [x] CRUD de Pacientes
- [x] CRUD de Consultas
- [x] Autenticação básica
- [x] Validação com Zod
- [x] Documentação Swagger
- [x] Interface responsiva
- [x] Busca e filtros em tempo real
- [x] Debounce otimizado
- [ ] Autenticação JWT
- [ ] Testes automatizados
- [ ] CI/CD pipeline
- [ ] Deploy em produção

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo `LICENSE` para mais detalhes.

---

## 👨‍💻 Autor

**Douglas Meneses**

- GitHub: [@douglasmeneses](https://github.com/douglasmeneses)
- Email: douglas@clinica.com

---

## 📞 Suporte

Para problemas ou dúvidas:

1. Verifique a seção "Solução de Problemas"
2. Abra uma issue no GitHub
3. Consulte a documentação Swagger

---

## 🙏 Agradecimentos

- [React](https://react.dev) - Biblioteca UI
- [Express.js](https://expressjs.com) - Framework web
- [Prisma](https://www.prisma.io) - ORM
- [Material-UI](https://mui.com) - Componentes
- [Zod](https://zod.dev) - Validação

---

## ⭐ Se Este Projeto Ajudou, Deixe Uma Estrela!

```
     ⭐
    ⭐⭐⭐
   ⭐⭐⭐⭐⭐
  ⭐⭐⭐⭐⭐⭐⭐
 ⭐⭐⭐⭐⭐⭐⭐⭐⭐
```

---

**Versão:** 1.0.0  
**Última atualização:** Novembro 2025  
**Status:** ✅ Produção Pronta
