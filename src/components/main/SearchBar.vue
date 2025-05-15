<script setup lang="ts">
import { ref, watch } from 'vue';

const searchQuery = ref('');
const priorityFilter = ref('todas');

const emit = defineEmits(['update:searchQuery', 'update:priorityFilter']);

watch(searchQuery, (newQuery) => {
  emit('update:searchQuery', newQuery);
});

watch(priorityFilter, (newPriority) => {
  emit('update:priorityFilter', newPriority);
});
</script>

<template>

  <div class="search-container d-flex justify-content-center gap-3">
    <!-- Input de búsqueda -->
    <div class="input-group w-auto">
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

    <!-- Filtro de prioridad -->
    <div class="input-group w-auto">
      <label class="input-group-text bg-white" for="prioritySelect">Prioridad</label>
      <select
        id="prioritySelect"
        class="form-select"
        v-model="priorityFilter"
      >
        <option value="todas">Todas</option>
        <option value="alta">Alta</option>
        <option value="media">Media</option>
        <option value="baja">Baja</option>
      </select>
    </div>
  </div>
</template>
