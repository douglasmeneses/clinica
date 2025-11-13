#!/bin/bash

# Script para testar todos os endpoints da API
echo "🧪 INICIANDO TESTES COMPLETOS DA API CLÍNICA"
echo "================================================="

BASE_URL="http://localhost:3333"

echo ""
echo "1️⃣ TESTANDO ENDPOINTS DE SECRETÁRIOS"
echo "======================================"

# Criar Secretário
echo "📝 Criando Secretário..."
SECRETARIO_RESPONSE=$(curl -s -X POST ${BASE_URL}/secretarios \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Ana Silva",
    "email": "ana@clinica.com",
    "senha": "senha123",
    "telefone": "11999999999"
  }')
echo "✅ Resposta: $SECRETARIO_RESPONSE"

# Listar Secretários
echo "📋 Listando todos os Secretários..."
curl -s -X GET ${BASE_URL}/secretarios | jq .

# Buscar Secretário por ID
echo "🔍 Buscando Secretário por ID (1)..."
curl -s -X GET ${BASE_URL}/secretarios/1 | jq .

echo ""
echo "2️⃣ TESTANDO ENDPOINTS DE MÉDICOS"
echo "================================="

# Criar Médico
echo "📝 Criando Médico..."
MEDICO_RESPONSE=$(curl -s -X POST ${BASE_URL}/medicos \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Dr. João Santos",
    "email": "joao@clinica.com",
    "crm": "123456",
    "especialidade": "Cardiologia",
    "telefone": "11888888888"
  }')
echo "✅ Resposta: $MEDICO_RESPONSE"

# Listar Médicos
echo "📋 Listando todos os Médicos..."
curl -s -X GET ${BASE_URL}/medicos | jq .

# Buscar Médico por ID
echo "🔍 Buscando Médico por ID (1)..."
curl -s -X GET ${BASE_URL}/medicos/1 | jq .

echo ""
echo "3️⃣ TESTANDO ENDPOINTS DE PACIENTES"
echo "==================================="

# Criar Paciente
echo "📝 Criando Paciente..."
PACIENTE_RESPONSE=$(curl -s -X POST ${BASE_URL}/pacientes \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Maria Oliveira",
    "email": "maria@email.com",
    "cpf": "12345678901",
    "telefone": "11777777777",
    "dataNascimento": "1990-01-15"
  }')
echo "✅ Resposta: $PACIENTE_RESPONSE"

# Listar Pacientes
echo "📋 Listando todos os Pacientes..."
curl -s -X GET ${BASE_URL}/pacientes | jq .

# Buscar Paciente por ID
echo "🔍 Buscando Paciente por ID (1)..."
curl -s -X GET ${BASE_URL}/pacientes/1 | jq .

echo ""
echo "4️⃣ TESTANDO ENDPOINTS DE CONSULTAS"
echo "==================================="

# Criar Consulta
echo "📝 Criando Consulta..."
CONSULTA_RESPONSE=$(curl -s -X POST ${BASE_URL}/consultas \
  -H "Content-Type: application/json" \
  -d '{
    "dataHora": "2025-10-05T10:00:00Z",
    "pacienteId": 1,
    "medicoId": 1
  }')
echo "✅ Resposta: $CONSULTA_RESPONSE"

# Listar Consultas
echo "📋 Listando todas as Consultas..."
curl -s -X GET ${BASE_URL}/consultas | jq .

# Buscar Consulta por ID
echo "🔍 Buscando Consulta por ID (1)..."
curl -s -X GET ${BASE_URL}/consultas/1 | jq .

echo ""
echo "5️⃣ TESTANDO ENDPOINTS DE UPDATE"
echo "==============================="

# Atualizar Secretário
echo "📝 Atualizando Secretário (ID: 1)..."
curl -s -X PUT ${BASE_URL}/secretarios/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Ana Silva Santos",
    "email": "ana.santos@clinica.com",
    "senha": "novaSenha123",
    "telefone": "11999999998"
  }' | jq .

# Atualizar Médico
echo "📝 Atualizando Médico (ID: 1)..."
curl -s -X PUT ${BASE_URL}/medicos/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Dr. João Santos Silva",
    "email": "joao.santos@clinica.com",
    "crm": "123456",
    "especialidade": "Cardiologia Intervencionista",
    "telefone": "11888888887"
  }' | jq .

echo ""
echo "🎉 TESTES CONCLUÍDOS!"
echo "====================="
echo "✅ Todos os endpoints principais foram testados"
echo "📊 Swagger UI disponível em: ${BASE_URL}/api-docs"