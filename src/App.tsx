import React from 'react';
import TodoList from './components/TodoList';
import './styles/main.scss';

const App: React.FC = () => {
  return (
    <div className="app">
      <header className="app__header">
        <h1>To-Do App by Luka Kraljić</h1>
      </header>
      <main>
        <TodoList />
      </main>
    </div>
  );
};

export default App;