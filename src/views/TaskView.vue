<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { fetchTasksFromFirestore } from '@/services/taskService';
import SearchBar from '../components/main/SearchBar.vue';
import AddTask from '../components/main/AddTask.vue';
import ListPagination from '../components/main/ListPagination.vue';

import AppHeader from '../components/AppHeader.vue';
import AppFooter from '../components/AppFooter.vue';

import '../components/styles/TaskList.css';

const tasks = ref<{ id: string; title: string; description: string; deadline: string; priority: string; isFavorite: boolean,completed: boolean }[]>([]);
const searchQuery = ref('');
const loading = ref(true);
const taskToEdit = ref(null);

// Fetch tasks from Firestore on component mount
const loadTasks = async () => {
  loading.value = true;
  const result = await fetchTasksFromFirestore();
  if (result.success) {
    tasks.value = result.tasks || [];
  } else {
    console.error(result.message);
  }
  loading.value = false;
};

const handleTaskAdded = () => {
  loadTasks();
};

const handleTaskUpdated = () => {
  loadTasks();
};

const handleTaskDeleted = (taskId: string) => {
  tasks.value = tasks.value.filter(task => task.id !== taskId);
};

const handleEditTask = (task: { id: string; title: string; description: string; deadline: string; priority: string }) => {
  taskToEdit.value = task;
};

onMounted(() => {
  loadTasks();
});

// Filter tasks based on the search query
const filteredTasks = computed(() => {
  return tasks.value.filter(task =>
    task.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>

<template>
  <AppHeader />
  <div class="task-list">
    <SearchBar @update:searchQuery="searchQuery = $event" />
    <AddTask
      :taskToEdit="taskToEdit"
      @taskAdded="handleTaskAdded"
      @taskUpdated="handleTaskUpdated"
    />
    <div v-if="loading" class="text-center mt-4">Cargando tareas...</div>
    <div v-else-if="filteredTasks.length === 0" class="text-center mt-4">No se encontraron tareas.</div>
    <div v-else>
      <ListPagination :tasks="filteredTasks" @taskDeleted="handleTaskDeleted" @editTask="handleEditTask" />
    </div>
  </div>
  <AppFooter />
</template>
