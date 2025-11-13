# 📚 Guia: Repositório Local → GitHub com CLI

Este guia mostra como criar um repositório Git local e enviá-lo para o GitHub usando a linha de comando.

## 🔑 Pré-requisitos

- Git instalado: [git-scm.com](https://git-scm.com)
- GitHub CLI instalado: [cli.github.com](https://cli.github.com)
- Conta no GitHub
- Autenticação do GitHub CLI configurada

### Verificar Instalações

```bash
# Verificar Git
git --version

# Verificar GitHub CLI
gh --version
```

---

## 📋 Passo 1: Autenticar no GitHub CLI

Se ainda não está autenticado, configure:

```bash
gh auth login
```

**Passos:**
1. Escolha: `GitHub.com`
2. Escolha: `HTTPS`
3. Autentique com seu navegador
4. Use token ou senha conforme solicitado

**Verificar autenticação:**
```bash
gh auth status
```

---

## 📁 Passo 2: Preparar seu Projeto Local

Navegue para o diretório do seu projeto:

```bash
cd /caminho/do/seu/projeto
# No nosso caso:
cd /home/dgm/Desktop/unipe/2025.2
```

### 2.1 Inicializar Repositório Git (se não existir)

```bash
git init
```

**Resultado esperado:**
```
Initialized empty Git repository in /home/dgm/Desktop/unipe/2025.2/.git/
```

### 2.2 Configurar Usuário Git (primeira vez)

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu.email@gmail.com"
```

**Verificar configuração:**
```bash
git config --list
```

---

## 📝 Passo 3: Criar .gitignore

Certifique-se de que `.gitignore` existe na raiz:

```bash
cat .gitignore
```

Se não existir, crie um básico:

```bash
cat > .gitignore << 'EOF'
node_modules/
.env
.env.local
dist/
build/
.DS_Store
*.log
.next/
out/
.vscode/
.idea/
EOF
```

---

## 🚀 Passo 4: Adicionar e Fazer Commit

### 4.1 Adicionar Todos os Arquivos

```bash
git add .
```

**Verificar o que será adicionado:**
```bash
git status
```

### 4.2 Criar Primeiro Commit

```bash
git commit -m "chore: initial commit - projeto clínica setup"
```

**Mensagens de commit convencionais:**
- `feat:` nova funcionalidade
- `fix:` correção de bug
- `docs:` documentação
- `style:` formatação
- `refactor:` refatoração
- `test:` testes
- `chore:` tarefas administrativas

---

## 🌐 Passo 5: Criar Repositório no GitHub (2 Opções)

### Opção A: Usar GitHub CLI (Recomendado)

```bash
gh repo create clinica-api --source=. --remote=origin --push
```

**Parametros:**
- `clinica-api` - Nome do repositório no GitHub
- `--source=.` - Usar diretório atual
- `--remote=origin` - Definir como origin
- `--push` - Fazer push automaticamente

**Será perguntado:**
- Descrição (pressione Enter para pular)
- Público ou privado (escolha: public)
- Fazer push agora? (y)

### Opção B: Criar no GitHub Web e Ligar Localmente

**1. Crie no GitHub web:**
- Acesse [github.com/new](https://github.com/new)
- Nome: `clinica-api`
- Descrição: "API REST para gerenciamento de clínica médica"
- Público/Privado: Escolha
- Clique "Create repository"

**2. Conecte localmente:**

```bash
# Adicione o repositório remoto
git remote add origin https://github.com/SEU_USUARIO/clinica-api.git

# Verifique
git remote -v
```

**Resultado esperado:**
```
origin  https://github.com/SEU_USUARIO/clinica-api.git (fetch)
origin  https://github.com/SEU_USUARIO/clinica-api.git (push)
```

**3. Envie o código:**

```bash
# Renomear branch (se necessário)
git branch -M main

# Fazer push
git push -u origin main
```

---

## ✅ Passo 6: Verificar Push

```bash
# Ver histórico
git log

# Ver branch
git branch

# Ver remote
git remote -v
```

**Acessar repositório:**
```
https://github.com/SEU_USUARIO/clinica-api
```

---

## 📊 Passo 7: Configuração Completa (Nosso Projeto)

Para o projeto Clínica, faça tudo em sequência:

```bash
# 1. Navegar para o diretório
cd /home/dgm/Desktop/unipe/2025.2

# 2. Inicializar Git
git init

# 3. Configurar usuário (primeira vez)
git config --global user.name "Douglas Meneses"
git config --global user.email "seu.email@gmail.com"

# 4. Adicionar todos os arquivos
git add .

# 5. Primeiro commit
git commit -m "chore: initial commit - clinica api and frontend"

# 6. Criar repositório no GitHub e fazer push
gh repo create 2025.2 --source=. --remote=origin --push

# Ou manualmente:
# git remote add origin https://github.com/douglasmeneses/2025.2.git
# git branch -M main
# git push -u origin main
```

---

## 🔄 Após o Setup Inicial

### Fazer Mudanças e Enviar

```bash
# 1. Ver mudanças
git status

# 2. Adicionar mudanças
git add .
# Ou arquivo específico:
git add caminho/do/arquivo.ts

# 3. Fazer commit
git commit -m "feat: adicionar novo recurso"

# 4. Fazer push
git push
```

### Exemplo Prático

```bash
# Você editou um arquivo
nano api/src/index.ts

# Adicione a mudança
git add api/src/index.ts

# Commit
git commit -m "fix: corrigir erro na API"

# Push
git push
```

---

## 🌿 Trabalhar com Branches

### Criar Nova Branch

```bash
# Criar e ir para a branch
git checkout -b feature/nova-funcionalidade

# Ou (Git 2.23+)
git switch -c feature/nova-funcionalidade
```

### Enviar Branch

```bash
git push -u origin feature/nova-funcionalidade
```

### Voltar para Main

```bash
git checkout main
# Ou
git switch main
```

### Fazer Merge

```bash
# Voltar para main
git checkout main

# Atualizar main
git pull origin main

# Mergear a branch
git merge feature/nova-funcionalidade

# Push
git push
```

---

## 🆘 Problemas Comuns

### Erro: "fatal: not a git repository"

**Solução:**
```bash
git init
```

### Erro: "fatal: 'origin' does not appear to be a 'git' repository"

**Solução:**
```bash
git remote add origin https://github.com/usuario/repositorio.git
git remote -v  # Verificar
```

### Erro: "authentication failed"

**Solução (GitHub CLI):**
```bash
gh auth logout
gh auth login
```

**Solução (Git HTTPS):**
- Use Personal Access Token em vez de senha
- [github.com/settings/tokens](https://github.com/settings/tokens)

### Erro: "fatal: refusing to merge unrelated histories"

**Solução:**
```bash
git pull origin main --allow-unrelated-histories
```

### Desfazer último commit (não enviado)

```bash
git reset --soft HEAD~1
# Mude os arquivos
git add .
git commit -m "novo commit"
```

### Desfazer último commit (já enviado)

```bash
# Cuidado! Isso reescreve o histórico
git revert HEAD
git push
```

---

## 💡 Dicas Importantes

### 1. Sempre faça Pull Antes de Push

```bash
git pull origin main
git push origin main
```

### 2. Commits Frequentes

Faça commits pequenos e frequentes, não um grande no final.

### 3. Mensagens Descritivas

❌ Ruim: "mudanças"
✅ Bom: "feat: adicionar validação de CPF no paciente"

### 4. Ignore Arquivos Sensíveis

```bash
# Adicione ao .gitignore
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore
git add .gitignore
git commit -m "chore: update gitignore"
```

### 5. Ver Diferenças

```bash
# Mudanças não staged
git diff

# Mudanças staged
git diff --staged

# Diferença entre branches
git diff main feature/nova
```

---

## 📚 Comandos Úteis

```bash
# Ver histórico completo
git log

# Ver histórico simplificado
git log --oneline

# Ver histórico gráfico
git log --graph --oneline --all

# Ver quem mudou cada linha
git blame arquivo.ts

# Ver mudanças de um commit
git show 1a2b3c4d

# Procurar em commits
git log --grep="palavra-chave"

# Ver branches remotas
git branch -r

# Deletar branch local
git branch -d feature/antiga

# Deletar branch remota
git push origin --delete feature/antiga

# Clonar repositório
git clone https://github.com/usuario/repositorio.git

# Sincronizar fork
git fetch upstream
git rebase upstream/main
git push origin main
```

---

## 🎯 Fluxo Completo (Resumido)

```bash
# 1. Setup inicial
cd /seu/projeto
git init
git config --global user.name "Nome"
git config --global user.email "email@example.com"

# 2. Preparar código
git add .
git commit -m "chore: initial commit"

# 3. Enviar para GitHub
gh repo create nome-repo --source=. --remote=origin --push

# 4. Próximas mudanças (repetir isso)
# ... edite arquivos ...
git add .
git commit -m "tipo: descrição"
git push
```

---

## 📖 Recursos

- [Git Documentation](https://git-scm.com/doc)
- [GitHub CLI Docs](https://cli.github.com/manual)
- [Conventional Commits](https://www.conventionalcommits.org)
- [Git Flow](https://nvie.com/posts/a-successful-git-branching-model)

---

**Próximos passos para nosso projeto:**

1. ✅ Inicializar Git
2. ✅ Fazer commit inicial
3. ✅ Criar repositório no GitHub
4. 📌 Configurar CI/CD (GitHub Actions)
5. 📌 Setup de reviews e proteção de branch
