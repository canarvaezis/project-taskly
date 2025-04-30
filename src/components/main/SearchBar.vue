<script setup lang="ts">
import { ref, watch } from 'vue';

const searchQuery = ref('');

// Emit the search query to the parent component
const emit = defineEmits(['update:searchQuery']);
watch(searchQuery, (newQuery) => {
  emit('update:searchQuery', newQuery);
});
</script>

<template>
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
</template>
