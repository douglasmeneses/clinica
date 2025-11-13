#!/bin/bash
# health-check.sh
# Script para verificar status de deploy

echo "🏥 Health Check - Clínica API"
echo "================================"

# Cores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar variáveis de ambiente
echo "📋 Verificando variáveis de ambiente..."

check_env() {
  if [ -z "$1" ]; then
    echo -e "${RED}❌ $2 não está definido${NC}"
    return 1
  else
    echo -e "${GREEN}✅ $2 está definido${NC}"
    return 0
  fi
}

check_env "$DATABASE_URL" "DATABASE_URL"
check_env "$NODE_ENV" "NODE_ENV"
check_env "$PORT" "PORT"
check_env "$JWT_SECRET" "JWT_SECRET"
check_env "$CORS_ORIGIN" "CORS_ORIGIN"

echo ""
echo "📊 Valores de ambiente:"
echo "NODE_ENV: $NODE_ENV"
echo "PORT: ${PORT:-3333}"
echo "DATABASE_URL: ${DATABASE_URL:0:30}..."

echo ""
echo "🔗 Testando conectividade..."

# Se estiver em produção, fazer uma chamada à API
if [ "$NODE_ENV" = "production" ]; then
  API_URL="${1:-http://localhost:${PORT:-3333}}"
  echo "Testando: $API_URL/api/medicos"
  
  response=$(curl -s -w "\n%{http_code}" "$API_URL/api/medicos" 2>/dev/null)
  http_code=$(echo "$response" | tail -n1)
  
  if [ "$http_code" = "200" ] || [ "$http_code" = "201" ]; then
    echo -e "${GREEN}✅ API respondendo corretamente (HTTP $http_code)${NC}"
  else
    echo -e "${YELLOW}⚠️  API retornou HTTP $http_code${NC}"
  fi
fi

echo ""
echo "================================"
echo -e "${GREEN}Health check concluído!${NC}"
