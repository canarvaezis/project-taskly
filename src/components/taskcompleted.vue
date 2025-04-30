<template>
  <div style="padding: 1rem">
    <h2>Lista de Tareas</h2>

    <label>
      <input type="checkbox" v-model="showCompletedOnly" />
      Mostrar solo completadas
    </label>

    <div style="margin-top: 1rem">
      <div
        v-for="task in filteredTasks"
        :key="task.id"
        :style="{
          textDecoration: task.completed ? 'line-through' : 'none',
          color: task.completed ? 'gray' : 'black',
          marginBottom: '8px'
        }"
      >
        <input
          type="checkbox"
          v-model="task.completed"
          @change="toggleTask(task.id)"
        />
        {{ task.title }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const tasks = ref([
  { id: 1, title: 'Lavar el auto', completed: false },
  { id: 2, title: 'Hacer compras', completed: false },
  { id: 3, title: 'Estudiar Vue', completed: false },
])

const showCompletedOnly = ref(false)

const toggleTask = (id) => {
  const task = tasks.value.find((t) => t.id === id)
  if (task) {
    task.completed = !task.completed
  }
}

const filteredTasks = computed(() => {
  return showCompletedOnly.value
    ? tasks.value.filter((t) => t.completed)
    : tasks.value
})
</script>