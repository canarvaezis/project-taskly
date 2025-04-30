<script setup lang="ts">
import { ref, computed } from 'vue';
import './TaskList.css'; // Import the external CSS file

interface Task {
  id: number;
  title: string;
  description: string;
  isFavorite: boolean;
}

const tasks = ref<Task[]>([
  { id: 1, title: 'Buy Groceries', description: 'Purchase fruits, vegetables, and dairy products', isFavorite: false },
  { id: 2, title: 'Morning Workout', description: 'Complete a 30-minute cardio session', isFavorite: false },
  { id: 3, title: 'Team Meeting', description: 'Discuss project updates with the team', isFavorite: false },
  { id: 4, title: 'Read a Book', description: 'Finish reading the current chapter of the book', isFavorite: false },
  { id: 5, title: 'Plan Vacation', description: 'Research destinations and create an itinerary', isFavorite: false },
  { id: 6, title: 'Another Task', description: 'Another task description', isFavorite: true },
  { id: 7, title: 'Important Task', description: 'This task is very important', isFavorite: false },
  { id: 8, title: 'Urgent Task', description: 'This task needs immediate attention', isFavorite: true },
  { id: 9, title: 'Optional Task', description: 'This task is optional', isFavorite: false },
  { id: 10, title: 'Completed Task', description: 'This task is already completed', isFavorite: false },
]);

const tasksPerPage = 4;
const currentPage = ref(1);
const searchQuery = ref('');

const filteredTasks = computed(() => {
  return tasks.value.filter(task =>
    task.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const paginatedTasks = computed(() => {
  const start = (currentPage.value - 1) * tasksPerPage;
  const end = start + tasksPerPage;
  return filteredTasks.value.slice(start, end);
});

const totalPages = computed(() => Math.ceil(tasks.value.length / tasksPerPage));

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const toggleFavorite = (task: Task) => {
  task.isFavorite = !task.isFavorite;
};
</script>

<template>
  <div class="task-list">
    <!-- Search Bar -->
    <div class="search-container d-flex justify-content-center">
      <div class="input-group">
        <span class="input-group-text bg-white border-end-0">
          <i class="bi bi-search"></i>
        </span>
        <input
          type="text"
          class="form-control border-start-0"
          placeholder="Buscar tareas..."
          v-model="searchQuery"
        >
      </div>
    </div>

    <!-- Add Task Button -->
    <div class="add-task-container mb-4 mt-3">
      <button class="btn add-task-btn w-100 d-flex align-items-center justify-content-center gap-2">
        <i class="bi bi-plus-lg"></i>
        <span>Agregar Nueva Tarea</span>
      </button>
    </div>

    <!-- Task Cards -->
    <div class="task-cards">
      <div v-for="task in paginatedTasks" :key="task.id" class="task-card mb-3">
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

    <!-- Pagination -->
    <div class="pagination d-flex justify-content-center gap-2 mt-4">
      <button class="btn btn-outline-secondary px-3" @click="goToPage(currentPage - 1)">
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
      <button class="btn btn-outline-secondary px-3" @click="goToPage(currentPage + 1)">
        Next <i class="bi bi-chevron-right"></i>
      </button>
    </div>
  </div>
</template>
