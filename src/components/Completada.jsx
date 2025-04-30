import React from 'react';

export default function Task({ task, onToggle }) {
  return (
    <div
      style={{
        textDecoration: task.completed ? 'line-through' : 'none',
        color: task.completed ? 'gray' : 'black',
        marginBottom: '8px',
      }}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      {task.title}
    </div>
  );
}
