// Exemplos de respostas que o backend deve retornar

// ============ LOGIN ============

// Requisição
{
  "matricula": "1234",
  "senha": "senha123",
  "unidade": "unidade-1"
}

// Resposta sucesso (200)
{
  "usuario": {
    "nome": "João Silva",
    "matricula": "1234",
    "unidade": "CBMPE - Centro"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." // opcional
}

// Resposta erro (401)
{
  "mensagem": "Usuário ou senha incorretos"
}

// ============ OCORRÊNCIAS ============

// GET /ocorrencias?unidade=unidade-1
[
  {
    "protocolo": "OCR20240001",
    "natureza": "Incêndio Estrutural",
    "estado": "Despachado",
    "gravidade": "Alta",
    "local": "Rua das Flores, 123 - Recife, PE",
    "horaPedido": "2024-01-15 14:30",
    "riscosAdicionais": "Estrutura comprometida",
    "statusLocal": "Em atendimento"
  },
  {
    "protocolo": "OCR20240002",
    "natureza": "Atendimento Pré-hospitalar",
    "estado": "Atendido",
    "gravidade": "Média",
    "local": "Av. Getúlio Vargas - Recife, PE",
    "horaPedido": "2024-01-15 15:45",
    "riscosAdicionais": "Nenhum",
    "statusLocal": "Aguardando conclusão"
  },
  {
    "protocolo": "OCR20240003",
    "natureza": "Resgate Veicular",
    "estado": "Concluído",
    "gravidade": "Alta",
    "local": "BR-101 (Km 50) - Recife, PE",
    "horaPedido": "2024-01-15 10:20",
    "riscosAdicionais": "Trânsito intenso",
    "statusLocal": "Finalizado com sucesso"
  }
]

// ============ UPDATE OCORRÊNCIA ============

// PUT /ocorrencias/OCR20240001
{
  "estado": "Concluído",
  "statusLocal": "Incêndio controlado e extinto",
  "assinaturaBase64": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA...",
  "unidade": "unidade-1"
}

// Resposta (200)
{
  "protocolo": "OCR20240001",
  "natureza": "Incêndio Estrutural",
  "estado": "Concluído",
  "gravidade": "Alta",
  "local": "Rua das Flores, 123 - Recife, PE",
  "horaPedido": "2024-01-15 14:30",
  "riscosAdicionais": "Estrutura comprometida",
  "statusLocal": "Incêndio controlado e extinto",
  "assinaturaBase64": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA..."
}

// ============ DADOS COMPLETOS DE EXEMPLO ============

{
  "protocolo": "OCR20240001",
  "natureza": "Incêndio Estrutural",
  "estado": "Despachado",
  "gravidade": "Alta",
  "local": "Rua das Flores, 123 - Recife, PE",
  "horaPedido": "2024-01-15 14:30:00",
  "riscosAdicionais": "Estrutura comprometida, possível colapso",
  "statusLocal": "Em atendimento ativo",
  "coordenadas": {
    "lat": -8.0476,
    "lng": -34.8770
  },
  "fotos": [
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAA...",
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAA..."
  ],
  "assinaturaBase64": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA..."
}

// ============ UNIDADES PADRÃO ============

[
  {
    "valor": "unidade-1",
    "label": "CBMPE - Centro"
  },
  {
    "valor": "unidade-2",
    "label": "CBMPE - Recife"
  },
  {
    "valor": "unidade-3",
    "label": "CBMPE - Caruaru"
  },
  {
    "valor": "unidade-4",
    "label": "CBMPE - Garanhuns"
  }
]

// ============ USUÁRIOS DE TESTE ============

// Para testes locais, use estas credenciais:

{
  "matricula": "1234",
  "senha": "senha123",
  "unidade": "unidade-1"
}
// Resposta esperada:
// {
//   "usuario": {
//     "nome": "João Silva",
//     "matricula": "1234",
//     "unidade": "CBMPE - Centro"
//   }
// }

{
  "matricula": "5678",
  "senha": "senha456",
  "unidade": "unidade-2"
}
// Resposta esperada:
// {
//   "usuario": {
//     "nome": "Maria Santos",
//     "matricula": "5678",
//     "unidade": "CBMPE - Recife"
//   }
// }

{
  "matricula": "9999",
  "senha": "admin123",
  "unidade": "unidade-1"
}
// Resposta esperada:
// {
//   "usuario": {
//     "nome": "Administrador",
//     "matricula": "9999",
//     "unidade": "CBMPE - Centro"
//   }
// }
