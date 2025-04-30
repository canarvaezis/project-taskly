<script setup lang="ts">
import { defineProps } from 'vue';

interface Task {
  id: number;
  title: string;
  description: string;
  isFavorite: boolean;
}

defineProps<{ tasks: Task[] }>();

const toggleFavorite = (task: Task) => {
  task.isFavorite = !task.isFavorite;
};
</script>

<template>
  <div class="task-cards">
    <div v-for="task in tasks" :key="task.id" class="task-card mb-3">
      <div class="d-flex gap-3">
        <div class="task-checkbox">
          <div class="checkbox-placeholder"></div>
        </div>
        <div class="task-content flex-grow-1">
          <h3 class="task-title">{{ task.title }}</h3>
          <p class="task-description">{{ task.description }}</p>
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
