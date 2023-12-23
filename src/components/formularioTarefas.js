import React, { useState } from 'react';
import { criarTarefa } from '../services/api';
import '../style/style.css';

function FormularioTarefa() {
  const [titulo, setTitulo] = useState('');
  

  const cadastrar = async (e) => {
    e.preventDefault();
    if (!titulo) return;
    try {
      await criarTarefa({ titulo });
      setTitulo('');
      window.location.reload();
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
    }
  };


  return (
    <div>
      <h2>❤️</h2>
      <form onSubmit={cadastrar}>
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
