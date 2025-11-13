# Changelog

Todos os cambios notáveis neste projeto serão documentados neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/) e este projeto adere a [Semantic Versioning](https://semver.org/).

---

## [1.0.0] - 2025-11-12

### ✨ Adicionado

#### Backend

- ✅ CRUD completo para Secretários
- ✅ CRUD completo para Médicos (20+ especialidades)
- ✅ CRUD completo para Pacientes
- ✅ CRUD completo para Consultas com relacionamentos
- ✅ Autenticação básica com email/senha
- ✅ Validação robusta com Zod
- ✅ Documentação Swagger completa
- ✅ Error handler centralizado
- ✅ Logging estruturado
- ✅ Banco PostgreSQL com Prisma ORM
- ✅ Script de seed com 20 médicos

#### Frontend

- ✅ Tela de login com validação em tempo real
- ✅ Dashboard intuitivo e responsivo
- ✅ Gestão de Pacientes (CRUD + busca/filtros)
- ✅ Gestão de Consultas (CRUD + filtros de período)
- ✅ Busca em tempo real com debounce 300ms
- ✅ Tema claro/escuro com Material-UI
- ✅ Componentes reutilizáveis
- ✅ Validação com Zod
- ✅ Interface responsiva
- ✅ Snackbar com feedback de ações

#### DevOps

- ✅ Docker Compose para PostgreSQL
- ✅ Variáveis de ambiente (.env)
- ✅ Scripts npm para setup
- ✅ Build para produção

#### Documentação

- ✅ README.md completo e profissional
- ✅ Guia de Contribuição (CONTRIBUTING.md)
- ✅ Licença MIT
- ✅ Changelog
- ✅ Swagger API Docs

### 🔧 Configurado

- Node.js 18+
- React 19 + TypeScript 5.8
- Express.js 5.1 + TypeScript 5.9
- Material-UI 7.3
- Prisma 6.16
- PostgreSQL Latest
- Zod 4.1
- Docker & Docker Compose

### 🔒 Segurança

- Senhas com hash bcryptjs
- Validação de entrada com Zod
- CORS configurado
- Tipagem forte com TypeScript

---

## [Não Lançado / Roadmap]

### 🚀 Planejado para Próximas Versões

#### Versão 1.1.0 - Autenticação Avançada

- [ ] JWT Authentication
- [ ] Refresh Tokens
- [ ] Logout com invalidação de token
- [ ] Recuperação de senha
- [ ] Autenticação com Google/GitHub

#### Versão 1.2.0 - Features Adicionais

- [ ] Consulta por status (agendada, confirmada, realizada, cancelada)
- [ ] Notificações por email para consultas
- [ ] Relatórios (PDF/Excel)
- [ ] Dashboard com gráficos e estatísticas
- [ ] Agenda em calendário (Month/Week/Day view)

#### Versão 1.3.0 - Performance

- [ ] Paginação de dados
- [ ] Lazy loading de componentes
- [ ] Cache de requisições
- [ ] Otimização de imagens
- [ ] Code splitting

#### Versão 1.4.0 - Testes

- [ ] Unit tests com Jest/Vitest
- [ ] Integration tests com Testing Library
- [ ] E2E tests com Cypress/Playwright
- [ ] Coverage > 80%

#### Versão 1.5.0 - CI/CD & Deploy

- [ ] GitHub Actions CI/CD
- [ ] Deploy automático
- [ ] Staging environment
- [ ] Production environment

#### Versão 2.0.0 - Funcionalidades Avançadas

- [ ] Agendamento recorrente
- [ ] Teleconsulta integrada
- [ ] Prescrições eletrônicas
- [ ] Histórico médico completo
- [ ] Integração com sistemas de pagamento
- [ ] Mobile app (React Native)

---

## Notas de Contribuição

### Como Reportar Issues

- Use templates específicos
- Seja descritivo e forneça exemplos
- Inclua screenshot quando aplicável

### Como Contribuir

- Veja [CONTRIBUTING.md](./CONTRIBUTING.md)
- Siga padrões de código
- Teste suas mudanças
- Faça commits bem descritos

---

## Referências

- [Repository](https://github.com/douglasmeneses/clinica-api)
- [Issues](https://github.com/douglasmeneses/clinica-api/issues)
- [Discussions](https://github.com/douglasmeneses/clinica-api/discussions)

---

## Autor

**Douglas Meneses**

- GitHub: [@douglasmeneses](https://github.com/douglasmeneses)

---

## Licença

Este projeto está sob a licença MIT. Veja [LICENSE](./LICENSE) para detalhes.

---

**Última atualização:** Novembro 2025
