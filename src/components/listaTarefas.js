import React, { useState, useEffect } from 'react';
import { getTarefas } from '../services/api';

function ListaTarefa() {
  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    fetchTarefas();
  }, []);

  const fetchTarefas = async () => {
    try {
      const response = await getTarefas();
      setTarefas(response.data.tarefas); // Atualizando o estado com a lista de tarefas
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    }
  };

  return (
    <div>
      <h2>Lista de Tarefas</h2>
      <ul>
        {tarefas.map((tarefa) => (
          <li key={tarefa.id}>{tarefa.titulo}</li>
        ))}
      </ul>
    </div>
  );
}

export default ListaTarefa;
