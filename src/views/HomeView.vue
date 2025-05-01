<template>
  <div class="home-container">
    <div class="home-card">
      <h1>Bienvenido, {{ userEmail }}</h1>

      <div class="task-section">
        <h2>Mis Tareas</h2>

        <form @submit.prevent="addTask" class="task-form">
          <input v-model="newTask" type="text" placeholder="Nueva tarea..." />
          <button type="submit">Agregar</button>
        </form>

        <div class="task-action">
          <button @click="toggleView" class="toggle-btn">
            Ver {{ showCompleted ? 'Pendientes' : 'Completadas' }}
          </button>
        </div>

        <div class="task-list">
          <div
            class="task-item"
            v-for="(task, index) in filteredTasks"
            :key="index"
          >
            <label class="checkbox-label">
              <input
                type="checkbox"
                v-model="task.done"
                @change="saveTasks"
              />
              <span class="custom-checkbox"></span>
            </label>
            <span class="task-text">{{ task.text }}</span>
            <button class="delete-btn" @click="removeTask(index)">🗑</button>
          </div>
        </div>
      </div>

      <button class="logout-btn" @click="logout">Cerrar sesión</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userEmail = ref('')
const newTask = ref('')
const tasks = ref<{ text: string; done: boolean }[]>([])
const showCompleted = ref(false)

onMounted(() => {
  const storedUser = localStorage.getItem('user')
  if (!storedUser) {
    router.push('/login')
  } else {
    const user = JSON.parse(storedUser)
    userEmail.value = user.email

    const savedTasks = localStorage.getItem('tasks')
    if (savedTasks) {
      tasks.value = JSON.parse(savedTasks)
    }
  }
})

function logout() {
  localStorage.removeItem('user')
  router.push('/login')
}

function addTask() {
  if (newTask.value.trim()) {
    tasks.value.push({ text: newTask.value, done: false })
    newTask.value = ''
    saveTasks()
  }
}

function removeTask(index: number) {
  tasks.value.splice(index, 1)
  saveTasks()
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks.value))
}

function toggleView() {
  showCompleted.value = !showCompleted.value
}

// Computed property to filter tasks based on the current view (completed or pending)
const filteredTasks = computed(() => {
  return showCompleted.value
    ? tasks.value.filter((task) => task.done)
    : tasks.value.filter((task) => !task.done)
})
</script>

<style scoped>
.home-container {
  display: flex;
  justify-content: center;
  padding-top: 50px;
  background: linear-gradient(135deg, #2c3e50, #4ca1af);
  min-height: 100vh;
}

.home-card {
  background-color: #ffffff;
  padding: 40px 30px;
  border-radius: 16px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  width: 440px;
  text-align: center;
}

h1 {
  margin-bottom: 10px;
  color: #2c3e50;
}

h2 {
  margin-bottom: 20px;
  color: #4ca1af;
}

.task-form {
  display: flex;
  gap: 10px;
  margin-bottom: 25px;
}

.task-form input {
  flex: 1;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.task-form button {
  padding: 10px 16px;
  font-size: 14px;
  background-color: #4ca1af;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.task-action {
  margin-bottom: 20px;
}

.toggle-btn {
  padding: 8px 16px;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 300px;
  overflow-y: auto;
}

.task-item {
  display: flex;
  align-items: center;
  background: #f8f8f8;
  padding: 12px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.task-text {
  flex: 1;
  font-size: 15px;
  padding-left: 10px;
  text-align: left;
}

.checkbox-label {
  display: flex;
  align-items: center;
}

input[type='checkbox'] {
  display: none;
}

.custom-checkbox {
  width: 18px;
  height: 18px;
  border-radius: 4px;
  border: 2px solid #4ca1af;
  position: relative;
  display: inline-block;
}

input[type='checkbox']:checked + .custom-checkbox::after {
  content: '✔';
  position: absolute;
  top: -2px;
  left: 2px;
  font-size: 14px;
  color: #4ca1af;
}

.delete-btn {
  background: transparent;
  border: none;
  font-size: 18px;
  margin-left: 10px;
  cursor: pointer;
  color: #e74c3c;
}

.logout-btn {
  margin-top: 30px;
  padding: 10px 20px;
  font-size: 14px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
</style>
