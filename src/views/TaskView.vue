<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { fetchTasksFromFirestore } from '@/services/taskService';
import SearchBar from '../components/main/SearchBar.vue';
import AddTask from '../components/main/AddTask.vue';
import ListPagination from '../components/main/ListPagination.vue';

import AppHeader from '../components/AppHeader.vue';
import AppFooter from '../components/AppFooter.vue';

import '../components/styles/TaskList.css';

type Task = {
  id: string;
  title: string;
  description: string;
  deadline: string;
  priority: string;
  isFavorite: boolean;
  completed: boolean;
  tags: string[];
  uid?: string;
};

const tasks = ref<Task[]>([]);
const loading = ref(false);
const searchQuery = ref('');
const priorityFilter = ref('todas');
const taskToEdit = ref<Task | null>(null);

const loadTasks = async () => {
  loading.value = true;
  const result = await fetchTasksFromFirestore();
  if (result.success) {
    tasks.value = (result.tasks || []).map((task: Task) => ({
      id: task.id,
      title: task.title,
      description: task.description,
      deadline: task.deadline,
      priority: task.priority,
      isFavorite: task.isFavorite,
      completed: task.completed,
      tags: Array.isArray(task.tags) ? task.tags : [],
      uid: task.uid || '',  // Asegúrate de traer uid o asigna string vacío si no existe
    }));
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

const handleEditTask = (task: { id: string; title: string; description: string; deadline: string; priority: string; isFavorite: boolean; completed: boolean; tags: string[] }) => {
  taskToEdit.value = task;
};

onMounted(() => {
  loadTasks();
});

// Filter tasks based on the search query
const filteredTasks = computed(() => {
  return tasks.value.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesPriority = priorityFilter.value === 'todas' || task.priority === priorityFilter.value;
    return matchesSearch && matchesPriority;
  });
});
</script>

<template>
  <AppHeader />
  <div class="task-list">
    <SearchBar
      @update:searchQuery="searchQuery = $event"
      @update:priorityFilter="priorityFilter = $event"
    />
    <AddTask
      :taskToEdit="taskToEdit"
      @taskAdded="handleTaskAdded"
      @taskUpdated="handleTaskUpdated"
      class="mt-5"
      />
    <div v-if="loading" class="text-center mt-4">Cargando tareas...</div>
    <div v-else-if="filteredTasks.length === 0" class="text-center mt-4">No se encontraron tareas.</div>
    <div v-else>
      <ListPagination :tasks="filteredTasks" @taskDeleted="handleTaskDeleted" @editTask="handleEditTask" />
    </div>
  </div>
  <AppFooter />
</template>
