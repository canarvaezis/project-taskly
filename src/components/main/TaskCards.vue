<script setup lang="ts">
import { defineProps } from 'vue';
import type { Task } from '@/types/taskTypes';
import { updateTaskCompletionStatus, deleteTaskFromFirestore } from '@/services/taskService';

const props = defineProps<{ tasks: Task[] }>();
const emit = defineEmits<{
  (e: 'taskDeleted', taskId: string): void;
  (e: 'editTask', task: Task): void;
}>();

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

const getDeadlineAlert = (task: Task) => {
  if (task.completed) {
    return { text: 'Completada', color: '#198754', icon: 'bi-check-circle-fill' };
  }
  const now = new Date();
  const deadline = new Date(task.deadline);
  const diffMs = deadline.getTime() - now.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  if (diffDays < 0) {
    return { text: '¡Vencida!', color: '#dc3545', icon: 'bi-exclamation-circle-fill' };
  } else if (diffDays < 1) {
    return { text: '¡Por vencer!', color: '#ffc107', icon: 'bi-exclamation-triangle-fill' };
  } else {
    return { text: 'A tiempo', color: '#0d6efd', icon: 'bi-clock-fill' };
  }
};

const getDeadlineStyle = (task: Task) => {
  if (task.completed) {
    return { color: '#198754', fontWeight: 'bold' }; // verde para completadas
  }
  const now = new Date();
  const deadline = new Date(task.deadline);
  const diffMs = deadline.getTime() - now.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  if (diffDays < 0) {
    return { color: '#dc3545', fontWeight: 'bold' }; // rojo
  } else if (diffDays < 1) {
    return { color: '#ffc107', fontWeight: 'bold' }; // amarillo
  } else {
    return { color: '#198754' }; // verde
  }
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
          <div
            class="task-deadline"
            :style="getDeadlineStyle(task)"
            style="font-size: 0.95em;"
          >
            {{ task.deadline.slice(0, 10) }}
            <span v-if="getDeadlineAlert(task)" :style="{ color: getDeadlineAlert(task)?.color, marginLeft: '8px', fontWeight: 'bold' }">
              <i class="bi" :class="getDeadlineAlert(task)?.icon"></i>
              {{ getDeadlineAlert(task)?.text }}
            </span>
          </div>
          <p class="task-description">{{ truncateText(task.description, 70) }}</p>
          <div
            :style="{
              color:
                task.priority === 'alta'
                  ? '#dc3545'
                  : task.priority === 'media'
                  ? '#ffc107'
                  : task.priority === 'baja'
                  ? '#198754'
                  : 'inherit'
            }"
          >
            {{ task.priority }}
          </div>
        </div>
        <div class="task-actions d-flex flex-column gap-2 align-items-start">
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
