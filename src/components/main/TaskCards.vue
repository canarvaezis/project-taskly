<script setup lang="ts">
import { defineProps } from 'vue';
import type { Task } from '@/types/taskTypes'; // Use the Task interface from taskTypes

defineProps<{ tasks: Task[] }>();

const toggleFavorite = (task: Task) => {
  task.isFavorite = !task.isFavorite;
};

const toggleCompleted = (task: Task) => {
  task.completed = !task.completed; // Toggle the completed status
};

const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
};
</script>

<template>
  <div class="task-cards">
    <div v-for="task in tasks" :key="task.id" class="task-card mb-3">
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
          <button class="btn btn-link p-0">
            <i class="bi bi-pencil"></i>
          </button>
          <button class="btn btn-link p-0">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
