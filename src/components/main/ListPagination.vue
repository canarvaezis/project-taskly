<script setup lang="ts">
import { ref, computed, defineProps } from 'vue';
import TaskCards from './TaskCards.vue';

// Recibe las tareas como una propiedad
const props = defineProps<{ tasks: { id: string; title: string; description: string; isFavorite: boolean; deadline: string; priority: string; completed: boolean }[] }>();

const currentPage = ref(1);
const itemsPerPage = 10; // Número de elementos por página

const totalPages = computed(() => Math.ceil(props.tasks.length / itemsPerPage));

const paginatedTasks = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return props.tasks.slice(start, end);
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
</script>

<template>
  <TaskCards :tasks="paginatedTasks" />
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
