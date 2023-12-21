import React from 'react';
import ListaTarefa from './components/listaTarefas';
import FormularioTarefa from './components/formularioTarefas';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Minhas Tarefas</h1>
      <FormularioTarefa />
      <ListaTarefa />
    </div>
  );
}

export default App;
