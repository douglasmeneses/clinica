# 🎨 Clínica Frontend

Frontend React moderno para o Sistema de Gerenciamento de Clínica Médica.

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

# Iniciar desenvolvimento
npm run dev

# Build para produção
npm run build

# Linter
npm run lint

# Preview da build
npm run preview
```

## 📂 Estrutura

```
src/
├── components/       # Componentes reutilizáveis
├── pages/           # Páginas da aplicação
├── hooks/           # Custom hooks
├── services/        # Chamadas à API
├── schemas/         # Validação com Zod
├── types/           # Tipos TypeScript
├── shared/          # Constantes e utilitários
└── App.tsx          # Componente raiz
```

## 🌐 Endpoints

O frontend consome os seguintes endpoints:

- `POST /login` - Autenticação
- `GET/POST/PUT/DELETE /pacientes` - Gestão de pacientes
- `GET /medicos` - Listar médicos
- `GET/POST/PUT/DELETE /consultas` - Gestão de consultas

## 🎯 Funcionalidades

✅ Autenticação de usuários  
✅ Gestão completa de pacientes  
✅ Gestão completa de consultas  
✅ Busca e filtros em tempo real  
✅ Debounce otimizado (300ms)  
✅ Tema claro/escuro  
✅ Responsivo e acessível

---

**Para mais informações, veja o [README.md principal](../README.md)**
