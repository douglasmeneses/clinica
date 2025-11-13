# 🏥 API de Clínica Médica

Uma API REST completa para gerenciamento de clínica médica construída com Node.js, TypeScript, Prisma e PostgreSQL.

## 📋 Funcionalidades

- ✅ **Gerenciamento de Secretários** - CRUD completo
- ✅ **Gerenciamento de Médicos** - CRUD completo
- ✅ **Gerenciamento de Pacientes** - CRUD completo
- ✅ **Gerenciamento de Consultas** - CRUD completo com relacionamentos
- ✅ **Validações com Zod** - Validação robusta de dados de entrada
- ✅ **Documentação Swagger** - API totalmente documentada
- ✅ **Banco PostgreSQL** - Persistência de dados confiável

## 🛠️ Tecnologias

- **Node.js** + **TypeScript**
- **Express.js** - Framework web
- **Prisma** - ORM para banco de dados
- **PostgreSQL** - Banco de dados
- **Zod** - Validação de esquemas
- **Swagger** - Documentação da API
- **Docker** - Containerização do banco

## 🚀 Como Rodar a Aplicação

### 📋 Pré-requisitos

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**
- **Docker** e **Docker Compose**
- **Git**

### 1️⃣ **Clone o Repositório**

```bash
git clone https://github.com/douglasmeneses/clinica-api.git
cd clinica-api
```

### 2️⃣ **Instale as Dependências**

```bash
npm install
```

### 3️⃣ **Configure o Banco de Dados**

#### Inicie o PostgreSQL com Docker:

```bash
docker-compose up -d
```

Isso irá:

- Criar um container PostgreSQL na porta **5433**
- Configurar usuário: `admin`, senha: `admin`
- Criar banco de dados: `clinica`

#### Verifique se o container está rodando:

```bash
docker ps
```

### 4️⃣ **Configure as Variáveis de Ambiente**

O arquivo `.env` já está configurado:

```env
DATABASE_URL="postgresql://admin:admin@localhost:5433/clinica"
PORT=3333
```

### 5️⃣ **Execute as Migrações do Banco**

```bash
# Gerar o Prisma Client
npx prisma generate

# Executar migrações
npx prisma migrate dev
```

### 6️⃣ **Inicie a Aplicação**

```bash
# Desenvolvimento (com hot reload)
npm run dev

# Build para produção
npm run build
npm start
```

A aplicação estará disponível em: **http://localhost:3333**

## 📚 Documentação da API

### **Swagger UI**

Acesse a documentação interativa em:
**http://localhost:3333/api-docs**

### **Endpoints Principais**

#### 👤 **Secretários**

- `POST /secretarios` - Criar secretário
- `GET /secretarios` - Listar todos
- `GET /secretarios/:id` - Buscar por ID
- `PUT /secretarios/:id` - Atualizar
- `DELETE /secretarios/:id` - Deletar

#### 🏥 **Médicos**

- `POST /medicos` - Criar médico
- `GET /medicos` - Listar todos
- `GET /medicos/:id` - Buscar por ID
- `PUT /medicos/:id` - Atualizar
- `DELETE /medicos/:id` - Deletar

#### 👥 **Pacientes**

- `POST /pacientes` - Criar paciente
- `GET /pacientes` - Listar todos
- `GET /pacientes/:id` - Buscar por ID
- `PUT /pacientes/:id` - Atualizar
- `DELETE /pacientes/:id` - Deletar

#### 📅 **Consultas**

- `POST /consultas` - Criar consulta
- `GET /consultas` - Listar todas (com relacionamentos)
- `GET /consultas/:id` - Buscar por ID
- `PUT /consultas/:id` - Atualizar
- `DELETE /consultas/:id` - Deletar

## 🧪 Testando a API

### **1. Usando Swagger (Recomendado)**

1. Acesse: http://localhost:3333/api-docs
2. Clique em qualquer endpoint
3. Clique em "Try it out"
4. Preencha os dados e clique em "Execute"

### **2. Usando cURL**

#### Criar um Secretário:

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

#### Criar um Médico:

```bash
curl -X POST http://localhost:3333/medicos \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Dr. João Santos",
    "email": "joao@clinica.com",
    "crm": "123456",
    "especialidade": "Cardiologia"
  }'
```

#### Criar um Paciente:

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

#### Criar uma Consulta:

```bash
curl -X POST http://localhost:3333/consultas \
  -H "Content-Type: application/json" \
  -d '{
    "dataHora": "2025-12-25T10:00:00Z",
    "pacienteId": 1,
    "medicoId": 1
  }'
```

## 🗃️ Esquema do Banco de Dados

```prisma
model Secretario {
  id        Int      @id @default(autoincrement())
  nome      String
  email     String   @unique
  senha     String
  telefone  String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Medico {
  id            Int        @id @default(autoincrement())
  nome          String
  email         String     @unique
  crm           String     @unique
  especialidade String
  consultas     Consulta[]
  createdAt     DateTime   @default(now())
  updatedAt     DateTime   @updatedAt
}

model Paciente {
  id             Int        @id @default(autoincrement())
  nome           String
  email          String     @unique
  cpf            String     @unique
  telefone       String?
  dataNascimento DateTime   @db.Date
  consultas      Consulta[]
  createdAt      DateTime   @default(now())
  updatedAt      DateTime   @updatedAt
}

model Consulta {
  id         Int      @id @default(autoincrement())
  dataHora   DateTime
  motivo     String?
  pacienteId Int
  medicoId   Int
  paciente   Paciente @relation(fields: [pacienteId], references: [id])
  medico     Medico   @relation(fields: [medicoId], references: [id])
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}
```

## ⚙️ Validações

A API possui validações robustas com **Zod**:

- **Email**: formato válido obrigatório
- **CPF**: exatamente 11 dígitos numéricos
- **CRM**: apenas números
- **Telefone**: 10-15 caracteres
- **Data Nascimento**: deve ser no passado
- **Data Consulta**: deve ser no futuro
- **IDs**: números inteiros positivos

## 🐛 Solução de Problemas

### **Erro: "Port 5432 already in use"**

O PostgreSQL local está rodando. A aplicação usa a porta 5433 no Docker.

### **Erro: "Cannot find module '../generated/prisma'"**

Execute: `npx prisma generate`

### **Erro de migração**

Execute: `npx prisma migrate dev`

### **Container não inicia**

```bash
docker-compose down
docker-compose up -d
```

## 📦 Scripts Disponíveis

```bash
npm run dev       # Inicia em modo desenvolvimento
npm run build     # Build para produção
npm start         # Inicia versão de produção
npm run prisma:generate  # Gera Prisma Client
npm run prisma:migrate   # Executa migrações
npm run prisma:studio    # Abre Prisma Studio
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

**Douglas Meneses**

- GitHub: [@douglasmeneses](https://github.com/douglasmeneses)

---

⭐ **Se este projeto te ajudou, deixe uma estrela!** ⭐
