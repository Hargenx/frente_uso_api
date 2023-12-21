import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Exemplo de requisições
const apiRequests = {
  getTarefas: () => api.get('/tarefas'),

  criarTarefa: (novaTarefa) => api.post('/tarefas', novaTarefa),

  getTarefaById: (tarefaId) => api.get(`/tarefas/${tarefaId}`),

  atualizarTarefa: (tarefaId, dadosAtualizados) => api.put(`/tarefas/${tarefaId}`, dadosAtualizados),

  apagarTarefa: (tarefaId) => api.delete(`/tarefas/${tarefaId}`),
};

export const { getTarefas, criarTarefa, getTarefaById, atualizarTarefa, apagarTarefa } = apiRequests;
