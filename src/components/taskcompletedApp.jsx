import React, { useState } from 'react';
import Task from './Completada'; // importamos el componente completada

export default function TaskApp() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Lavar el auto', completed: false },
    { id: 2, title: 'Hacer compras', completed: false },
    { id: 3, title: 'Estudiar ', completed: false },
  ]);

  const [showCompletedOnly, setShowCompletedOnly] = useState(false);

  const toggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const filteredTasks = showCompletedOnly
    ? tasks.filter((t) => t.completed)
    : tasks;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Lista de Tareas</h2>
      <label>
        <input
          type="checkbox"
          checked={showCompletedOnly}
          onChange={() => setShowCompletedOnly(!showCompletedOnly)}
        />
        Mostrar solo completadas
      </label>

      <div style={{ marginTop: '1rem' }}>
        {filteredTasks.map((task) => (
          <Task key={task.id} task={task} onToggle={toggleTask} />
        ))}
      </div>
    </div>
  );
}
