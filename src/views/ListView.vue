<template>
  <div class="mt-4">
    <h1 class="mb-4">Gestor de Tareas</h1>
    <!-- Formulario para agregar tareas -->
    <form @submit.prevent="addTask" class="mb-4">
      <div class="mb-3">
        <label for="title" class="form-label">Título</label>
        <input
          type="text"
          id="title"
          class="form-control"
          v-model="task.title"
          required
          minlength="3"
        />
        <div v-if="!task.title || task.title.length < 3" class="text-danger">
          El título es obligatorio y debe tener al menos 3 caracteres.
        </div>
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Descripción</label>
        <textarea
          id="description"
          class="form-control"
          v-model="task.description"
        ></textarea>
      </div>
      <div class="mb-3">
        <label for="deadline" class="form-label">Fecha y Hora Límite</label>
        <input
          type="datetime-local"
          id="deadline"
          class="form-control"
          v-model="task.deadline"
          required
        />
      </div>
      <div class="mb-3">
        <label for="priority" class="form-label">Prioridad</label>
        <select id="priority" class="form-select" v-model="task.priority">
          <option value="alta">Alta</option>
          <option value="media">Media</option>
          <option value="baja">Baja</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Agregar Tarea</button>
    </form>

    <!-- Lista de tareas -->
    <ul class="list-group">
      <li
        v-for="task in paginatedTasks"
        :key="task.id"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <div>
          <h5>{{ task.title }}</h5>
          <p>{{ task.description }}</p>
          <small>Fecha límite: {{ task.deadline }}</small>
          <span
            class="badge"
            :class="{
              'bg-danger': task.priority === 'alta',
              'bg-warning': task.priority === 'media',
              'bg-success': task.priority === 'baja',
            }"
          >
            {{ task.priority }}
          </span>
        </div>
      </li>
    </ul>

    <!-- Controles de paginación -->
    <nav class="mt-3">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button class="page-link" @click="changePage(currentPage - 1)">Anterior</button>
        </li>
        <li
          class="page-item"
          v-for="page in totalPages"
          :key="page"
          :class="{ active: currentPage === page }"
        >
          <button class="page-link" @click="changePage(page)">{{ page }}</button>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button class="page-link" @click="changePage(currentPage + 1)">Siguiente</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
interface Task {
  id?: string;
  title: string;
  description: string;
  deadline: string;
  priority: string;
}

export default {
  data() {
    return {
      task: {
        title: "",
        description: "",
        deadline: "",
        priority: "media",
      } as Task,
      tasks: [] as Task[],
      currentPage: 1,
      tasksPerPage: 5,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.tasks.length / this.tasksPerPage);
    },
    paginatedTasks() {
      const start = (this.currentPage - 1) * this.tasksPerPage;
      const end = start + this.tasksPerPage;
      return this.tasks.slice(start, end);
    },
  },
  methods: {
    addTask() {
      if (!this.task.title || this.task.title.length < 3) {
        alert("El título es obligatorio y debe tener al menos 3 caracteres.");
        return;
      }

      const newTask = {
        id: Date.now().toString(),
        ...this.task
      };

      this.tasks.push(newTask);
      alert("Tarea agregada correctamente.");
      this.task = { title: "", description: "", deadline: "", priority: "media" } as Task;
    },
    changePage(page: number) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
  },
};
</script>
