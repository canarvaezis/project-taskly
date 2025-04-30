<script setup lang="ts">
import { ref, computed } from 'vue';
import SearchBar from '../components/main/SearchBar.vue';
import AddTask from '../components/main/AddTask.vue';
import ListPagination from '../components/main/ListPagination.vue';

import '../components/styles/TaskList.css';

const tasks = ref([
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

const searchQuery = ref('');

// Filter tasks based on the search query
const filteredTasks = computed(() => {
  return tasks.value.filter(task =>
    task.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>

<template>
  <div class="task-list">
    <SearchBar @update:searchQuery="searchQuery = $event" />
    <AddTask />
    <ListPagination :tasks="filteredTasks" />
  </div>
</template>

