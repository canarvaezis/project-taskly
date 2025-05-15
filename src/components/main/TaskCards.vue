<script setup lang="ts">
import { defineProps } from 'vue';
import type { Task } from '@/types/taskTypes';
import { updateTaskCompletionStatus, deleteTaskFromFirestore } from '@/services/taskService';

const props = defineProps<{ tasks: Task[] }>();
const emit = defineEmits<{
  (e: 'taskDeleted', taskId: string): void;
  (e: 'editTask', task: Task): void;
}>();

const toggleFavorite = (task: Task): void => {
  task.isFavorite = !task.isFavorite;
};

const toggleCompleted = async (task: Task) => {
  task.completed = !task.completed;
  const response = await updateTaskCompletionStatus(task.id, task.completed);
  if (!response.success) {
    console.error(response.message);
    task.completed = !task.completed; // Revert change if update fails
  }
};

const deleteTask = async (task: Task) => {
  const confirmDelete = confirm(`¿Eliminar la tarea "${task.title}"?`);
  if (!confirmDelete) return;

  const result = await deleteTaskFromFirestore(task.id);
  if (result.success) {
    emit('taskDeleted', task.id); // Comunica al padre que debe recargar las tareas
  } else {
    console.error('Error al eliminar la tarea:', result.message);
  }
};

const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
};
</script>

<template>
  <div class="task-cards">
    <div v-for="task in props.tasks" :key="task.id" class="task-card mb-3">
      <div class="d-flex gap-3">
        <div class="task-checkbox">
          <input
            type="checkbox"
            :checked="task.completed"
            @change="toggleCompleted(task)"
          />
        </div>
        <div class="task-content flex-grow-1">
          <h3 class="task-title">{{ truncateText(task.title, 40) }}</h3>
          <p class="task-description">{{ truncateText(task.description, 70) }}</p>
        </div>
        <div class="task-actions d-flex gap-2">
          <button class="btn btn-link p-0" @click="toggleFavorite(task)">
            <i class="bi" :class="task.isFavorite ? 'bi-star-fill' : 'bi-star'"></i>
          </button>
          <button class="btn btn-link p-0" @click="emit('editTask', task)">
            <i class="bi bi-pencil"></i>
          </button>
          <button class="btn btn-link p-0" @click="deleteTask(task)">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
