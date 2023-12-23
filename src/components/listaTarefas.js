import React, { useState, useEffect } from 'react';
import { getTarefas, apagarTarefa } from '../services/api';
import '../style/style.css';

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

  const apagaraTarefa = (tarefa) => {
    setModalVisible(true);
    setTarefaSelecionada(tarefa);
  };

  const confirmarTarefaApagada = async () => {
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

  const cancelarTarefaApagada = () => {
    setModalVisible(false);
    setTarefaSelecionada(null);
  };

  return (
    <div>
      <h2>Lista de Tarefas</h2>
      <ul>
        {tarefas.map((tarefa) => (
          <li key={tarefa.id} onClick={() => apagaraTarefa(tarefa)}>
            <span>{tarefa.titulo}</span>
            <span>{'\n' + (tarefa.feito ?  ' Concluída ' : ' Pendente ')}</span>
          </li>
        ))}
      </ul>

      {/* Modal de Confirmação */}
      {modalVisible && (
        <div className="modal-overlay" onClick={cancelarTarefaApagada}>
        <div className="modal-content">
          <div>Deseja apagar a tarefa "{tarefaSelecionada?.titulo}"?</div>
          <button className='botao_confirmar' onClick={confirmarTarefaApagada}>Sim</button>
          <button className='botao_cancelar' onClick={cancelarTarefaApagada}>Cancelar</button>
        </div>
      </div>
      )}

      {/* Modal de Alterar */}
      {modalVisible && (
        <div className="modal-overlay" onClick={cancelarTarefaApagada}>
        <div className="modal-content">
          <div>Foi feita a tarefa: "{tarefaSelecionada?.titulo}"?</div>
          <button className='botao_confirmar' onClick={confirmarTarefaApagada}>Sim</button>
          <button className='botao_cancelar' onClick={cancelarTarefaApagada}>Não</button>
        </div>
      </div>
      )}
    </div>
  );
}

export default ListaTarefa;
