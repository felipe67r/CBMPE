// models/data.js
export const db = {
  usuarios: [],
  triagens: [],
  ocorrencias: [
    {
      id: 1,
      natureza: "Incêndio em Residência",
      protocolo: "001",
      status: "Despachado",
      gravidade: "Alta",
      local: "Rua das Flores, 123",
      horario: "12:00"
    },
    {
      id: 2,
      natureza: "Acidente de Trânsito",
      protocolo: "002",
      status: "Despachado",
      gravidade: "Média",
      local: "Av. Principal, 500",
      horario: "12:15"
    }
  ]
};