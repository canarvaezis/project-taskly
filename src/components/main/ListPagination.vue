<script setup lang="ts">
import { ref, computed, defineProps } from 'vue';
import TaskCards from './TaskCards.vue';
import type { Task } from '@/types/taskTypes';

// Recibe las tareas como una propiedad
const props = defineProps<{ tasks: Task[] }>();

const emit = defineEmits<{
  (e: 'taskDeleted', taskId: string): void;
  (e: 'editTask', task: Task): void;
}>();

const currentPage = ref(1);
const itemsPerPage = 4; // Número de elementos por página

const tasksWithDefaults = computed(() =>
  props.tasks.map(task => ({
    ...task,
    completed: task.completed ?? false,
    tags: Array.isArray(task.tags) ? task.tags : [],
  }))
);

const totalPages = computed(() => Math.ceil(tasksWithDefaults.value.length / itemsPerPage));

const paginatedTasks = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return tasksWithDefaults.value.slice(start, end);
});

const goToPage = (page: number) => {
  if (page < 1) {
    currentPage.value = 1;
  } else if (page > totalPages.value) {
    currentPage.value = totalPages.value;
  } else {
    currentPage.value = page;
  }
};

const completedTasksCount = computed(() => props.tasks.filter(task => task.completed).length);
const incompleteTasksCount = computed(() => props.tasks.filter(task => !task.completed).length);
</script>

<template>
  <div class="task-summary bg-light p-3 rounded d-flex justify-content-between align-items-center mb-3">
    <span class="text-success fw-bold">Completadas: {{ completedTasksCount }}</span>
    <span class="text-danger fw-bold">Incompletas: {{ incompleteTasksCount }}</span>
  </div>
  <TaskCards
    :tasks="paginatedTasks"
    @taskDeleted="emit('taskDeleted', $event)"
    @editTask="emit('editTask', $event)"
  />
  <div class="pagination d-flex justify-content-center gap-2 mt-4">
    <button
      class="btn btn-outline-secondary px-3"
      :disabled="currentPage === 1"
      @click="goToPage(currentPage - 1)"
    >
      <i class="bi bi-chevron-left"></i> Prev
    </button>
    <button
      v-for="page in totalPages"
      :key="page"
      class="btn btn-outline-secondary px-3"
      :class="{ 'btn-primary text-white': page === currentPage }"
      @click="goToPage(page)"
    >
      {{ page }}
    </button>
    <button
      class="btn btn-outline-secondary px-3"
      :disabled="currentPage === totalPages"
      @click="goToPage(currentPage + 1)"
    >
      Next <i class="bi bi-chevron-right"></i>
    </button>
  </div>
</template>

