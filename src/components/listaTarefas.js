import React, { useState, useEffect } from 'react';
import { getTarefas, apagarTarefa, atualizarTarefa, getTarefaByNome } from '../services/api';
import '../style/style.css';

function ListaTarefa() {
  const [tarefas, setTarefas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [tarefaSelecionada, setTarefaSelecionada] = useState(null);
  const [termoPesquisa, setTermoPesquisa] = useState('');
  const [tarefaPesquisada, setTarefaPesquisada] = useState(null);
  const [mostrarInputPesquisa, setMostrarInputPesquisa] = useState(false);
  const [erroPesquisa, setErroPesquisa] = useState('');

  useEffect(() => {
    if (!mostrarInputPesquisa) {
      fetchTarefas();
    }
  }, [mostrarInputPesquisa]);

  const fetchTarefas = async () => {
    try {
      const response = await getTarefas();
      setTarefas(response.data.tarefas);
      setTarefaPesquisada(null);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    }
  };

  const apagarTarefaHandler = (tarefa) => {
    setModalVisible(true);
    setTarefaSelecionada(tarefa);
  };

  const confirmarTarefaApagada = async () => {
    if (tarefaSelecionada) {
      try {
        await apagarTarefa(tarefaSelecionada.id);
        fetchTarefas();
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

  const alterarTarefa = async (tarefa) => {
    try {
      const dadosAtualizados = {
        feito: !tarefa.feito,
      };
      await atualizarTarefa(tarefa.id, dadosAtualizados);
      fetchTarefas();
    } catch (error) {
      console.error('Erro ao alterar a tarefa:', error);
    }
  };

  const handleSearchClick = () => {
    setMostrarInputPesquisa((prevState) => !prevState);
    setErroPesquisa('');
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (termoPesquisa) {
      try {
        const response = await getTarefaByNome(termoPesquisa);
        if (response.data.tarefa) {
          setTarefaPesquisada(response.data.tarefa);
          setErroPesquisa('');
        } else {
          setTarefaPesquisada(null);
        }
      } catch (error) {
        console.error('Erro ao pesquisar tarefas:', error);
        setErroPesquisa('Erro ao pesquisar tarefas');
      }
    } else {
      setTarefaPesquisada(null);
      setErroPesquisa('Digite um termo para pesquisar');
    }
  };

  return (
    <div>
      <h2>Lista de Tarefas</h2>
      <div>
        <button onClick={handleSearchClick}>Pesquisar</button>
        {mostrarInputPesquisa && (
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={termoPesquisa}
              onChange={(e) => setTermoPesquisa(e.target.value)}
              placeholder="Pesquisar..."
            />
            <button type="submit">Buscar</button>
          </form>
        )}
        {erroPesquisa && <p>{erroPesquisa}</p>}
      </div>

      {tarefaPesquisada ? (
        <ul>
          <li key={tarefaPesquisada.id} onClick={() => apagarTarefaHandler(tarefaPesquisada)}>
            <span>{tarefaPesquisada.titulo}</span>
            <button
              className={`botao-alterar ${tarefaPesquisada.feito ? 'concluida' : 'pendente'}`}
              onClick={(e) => {
                e.stopPropagation();
                if (tarefaPesquisada && typeof tarefaPesquisada.feito !== 'undefined') {
                  alterarTarefa(tarefaPesquisada);
                } else {
                  console.error('Tarefa inválida:', tarefaPesquisada);
                }
              }}
            >
              {tarefaPesquisada.feito ? 'Concluída' : 'Pendente'}
            </button>
          </li>
        </ul>
      ) : (
        <ul>
          {tarefas.map((tarefa) => (
            <li key={tarefa.id} onClick={() => apagarTarefaHandler(tarefa)}>
              <span>{tarefa.titulo}</span>
              <button
                className={`botao-alterar ${tarefa.feito ? 'concluida' : 'pendente'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (tarefa && typeof tarefa.feito !== 'undefined') {
                    alterarTarefa(tarefa);
                  } else {
                    console.error('Tarefa inválida:', tarefa);
                  }
                }}
              >
                {tarefa.feito ? 'Concluída' : 'Pendente'}
              </button>
            </li>
          ))}
        </ul>
      )}

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
    </div>
  );
}

export default ListaTarefa;
