import React, { useState } from 'react';
import { criarTarefa } from '../services/api'; // Ajuste o serviço de acordo
import '../style/style.css';

function FormularioTarefa() {
  const [titulo, setTitulo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!titulo) return;
    try {
      await criarTarefa({ titulo });
      setTitulo('');
      // Você pode fazer isso de forma mais eficiente, atualizando a lista diretamente
      window.location.reload();
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
    }
  };

  return (
    <div>
      <h2>❤️</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Nova Tarefa"
        />
        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
}

export default FormularioTarefa;
