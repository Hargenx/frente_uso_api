import React, { useState, useEffect } from 'react';
import { getTarefas, apagarTarefa } from '../services/api';

function ListaTarefa() {
  const [tarefas, setTarefas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [tarefaSelecionada, setTarefaSelecionada] = useState(null);

  useEffect(() => {
    fetchTarefas();
  }, []);

  const fetchTarefas = async () => {
    try {
      const response = await getTarefas();
      setTarefas(response.data.tarefas);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    }
  };

  const handleDeleteClick = (tarefa) => {
    setModalVisible(true);
    setTarefaSelecionada(tarefa);
  };

  const handleConfirmDelete = async () => {
    if (tarefaSelecionada) {
      try {
        await apagarTarefa(tarefaSelecionada.id);
        // Atualiza a lista de tarefas após excluir a selecionada
        fetchTarefas();
        // Fecha o modal após a exclusão
        setModalVisible(false);
      } catch (error) {
        console.error('Erro ao apagar a tarefa:', error);
      }
    }
  };

  const handleCancelDelete = () => {
    setModalVisible(false);
    setTarefaSelecionada(null);
  };

  return (
    <div>
      <h2>Lista de Tarefas</h2>
      <ul>
        {tarefas.map((tarefa) => (
          <li key={tarefa.id} onClick={() => handleDeleteClick(tarefa)}>
            <span>{tarefa.titulo}</span>
            <span>{tarefa.feito ? ' - Concluída' : ' - Pendente'}</span>
          </li>
        ))}
      </ul>

      {/* Modal de Confirmação */}
      {modalVisible && (
        <div>
          <div>Deseja apagar a tarefa "{tarefaSelecionada?.titulo}"?</div>
          <button onClick={handleConfirmDelete}>Sim</button>
          <button onClick={handleCancelDelete}>Cancelar</button>
        </div>
      )}
    </div>
  );
}

export default ListaTarefa;
