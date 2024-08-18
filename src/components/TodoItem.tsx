import React from 'react';
import '../styles/TodoItem.scss';

interface TodoItemProps {
  id: number;
  title: string;
  completed: boolean;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
  isApiTask?: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, title, completed, onToggle, onRemove, isApiTask }) => {
  return (
    <div className={`todo-item ${completed ? 'todo-item--completed' : ''} ${isApiTask ? 'todo-item--api' : ''}`}>
      <input type="checkbox" checked={completed} onChange={() => onToggle(id)} />
      <span>{title}</span>
      <button onClick={() => onRemove(id)}>Remove</button>
    </div>
  );
};

export default TodoItem;