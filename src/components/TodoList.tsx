import React, { useState } from 'react';
import TodoItem from './TodoItem';
import '../styles/TodoList.scss';
import { fetchTodos } from '../services/todoApi';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  isApiTask?: boolean;
}

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState('');
  const [apiTaskCount, setApiTaskCount] = useState<number>(1);

  const addTask = () => {
    if (newTask.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        title: newTask.trim(),
        completed: false,
      };
      setTasks([newTodo, ...tasks]);
      setNewTask('');
    }
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const fetchApiTasks = async () => {
    try {
      if (apiTaskCount <= 0) {
        alert('Please enter a valid number of tasks to fetch.');
        return;
      }
      const apiTasks = await fetchTodos(apiTaskCount);
      const apiFormattedTasks = apiTasks.map(task => ({
        id: task.id + Date.now(), // Ensure unique ID
        title: task.todo,
        completed: task.completed,
        isApiTask: true,
      }));
      setTasks([...apiFormattedTasks, ...tasks]);
    } catch (error) {
      console.error('Failed to fetch tasks from API:', error);
      alert('Failed to fetch tasks from API');
    }
  };

  const completedCount = tasks.filter(task => task.completed).length;

  const deleteApiTasks = () => {
    setTasks(tasks.filter(task => !task.isApiTask));
  };

  const deleteManualTasks = () => {
    setTasks(tasks.filter(task => task.isApiTask));
  };

  return (
    <>
      
      <div className="todo-list-container">
        <div className="todo-list">
          <h1>Tasks</h1>
          <div className="todo-list__input-group">
            <input
              type="text"
              value={newTask}
              placeholder="Enter new task"
              onChange={e => setNewTask(e.target.value)}
              onKeyPress={e => {
                if (e.key === 'Enter') addTask();
              }}
            />
            <button onClick={addTask}>Add Task</button>
          </div>
          <div className="todo-list__api-group">
            <input
              type="number"
              min="1"
              value={apiTaskCount}
              onChange={e => setApiTaskCount(Number(e.target.value))}
              placeholder="Number of tasks"
            />
            <button onClick={fetchApiTasks}>Fetch API Tasks</button>
          </div>
          <div className="todo-list__tasks">
            {tasks.length > 0 ? (
              tasks.map(task => (
                <TodoItem
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  completed={task.completed}
                  isApiTask={task.isApiTask}
                  onToggle={toggleTask}
                  onRemove={removeTask}
                />
              ))
            ) : (
              <p>No tasks available. Add some tasks!</p>
            )}
          </div>
          <div className="todo-list__footer">
            <p>
              Completed Tasks: {completedCount} / {tasks.length}
            </p>
            <div className="todo-list__footer-buttons">
              <button onClick={() => setTasks([])}>Delete All</button>
              <button
                onClick={() =>
                  setTasks(tasks.filter(task => !task.completed))
                }
              >
                Delete Completed
              </button>
              <button onClick={deleteApiTasks}>Delete API Tasks</button>
              <button onClick={deleteManualTasks}>Delete Manual Tasks</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoList;