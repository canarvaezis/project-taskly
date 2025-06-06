<script setup lang="ts">
import { ref, watch } from 'vue';
import { saveTaskToFirestore, updateTaskInFirestore } from '@/services/taskService';
import type { Task } from '@/types/taskTypes';

const props = defineProps<{ taskToEdit?: Task | null }>();
const emit = defineEmits(['taskAdded', 'taskUpdated']);

const showPopup = ref(false);
const title = ref('');
const description = ref('');
const deadline = ref('');
const priority = ref('media');
const notification = ref('');
const editingId = ref<string | null>(null); // Guardar ID si se edita
const tags = ref<string[]>([]);
const customTag = ref('');

// ...existing code...

watch(() => props.taskToEdit, (newTask) => {
  if (newTask) {
    title.value = newTask.title;
    description.value = newTask.description;
    deadline.value = newTask.deadline;
    priority.value = newTask.priority;
    editingId.value = newTask.id;
    tags.value = newTask.tags ? [...newTask.tags] : [];
    showPopup.value = true;
  }
});

const togglePopup = () => {
  showPopup.value = !showPopup.value;
  notification.value = '';
  if (!showPopup.value) {
    // Limpiar campos si se cierra
    title.value = '';
    description.value = '';
    deadline.value = '';
    priority.value = 'media';
    editingId.value = null;
    tags.value = [];
  }
};

const saveTask = async (e: Event) => {
  e.preventDefault();

  if (title.value.trim().length < 3) {
    notification.value = 'El título debe tener al menos 3 caracteres.';
    return;
  }

  if (!description.value.trim()) {
    notification.value = 'La descripción no puede estar vacía.';
    return;
  }

  if (!deadline.value) {
    notification.value = 'Debe seleccionar una fecha y hora límite.';
    return;
  }

  const currentDateTime = new Date();
  const selectedDateTime = new Date(deadline.value);
  if (selectedDateTime < currentDateTime) {
    notification.value = 'La fecha y hora límite no pueden ser anteriores a la fecha actual.';
    return;
  }

  // 👉 Recuperar el UID del usuario actual
  const uid = localStorage.getItem('uid');
  if (!uid) {
    notification.value = 'Error: No se pudo identificar el usuario.';
    return;
  }

  const task: Task = {
    id: editingId.value ?? Date.now().toString(),
    title: title.value,
    description: description.value,
    deadline: deadline.value,
    priority: priority.value,
    isFavorite: false,
    completed: false,
    tags: [...tags.value],
    uid, // ✅ Añadir el uid requerido por el tipo Task
  };

  const result = editingId.value
    ? await updateTaskInFirestore(task)
    : await saveTaskToFirestore(task);

  notification.value = result.message;

  togglePopup();

  if (result.success) {
    if (editingId.value) {
      emit('taskUpdated', task);
    } else {
      emit('taskAdded');
    }
  }
};

const addCustomTag = () => {
  const tag = customTag.value.trim();
  if (tag && !tags.value.includes(tag)) {
    tags.value.push(tag);
  }
  customTag.value = '';
};

const removeTag = (tag: string) => {
  tags.value = tags.value.filter(t => t !== tag);
};
</script>

<template>
  <div class="add-task-container mb-4 mt-3">
    <button
      class="btn add-task-btn w-100 d-flex align-items-center justify-content-center gap-2"
      @click="togglePopup"
    >
      <i class="bi bi-plus-lg"></i>
      <span>Agregar Nueva Tarea</span>
    </button>

    <div
      v-if="showPopup"
      class="task-popup position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style="background-color: rgba(0, 0, 0, 0.5);"
    >
      <div class="popup-content bg-white p-4 rounded shadow">
        <h5 class="mb-3">{{ editingId ? 'Editar Tarea' : 'Crear Nueva Tarea' }}</h5>
        <form @submit="saveTask">
          <div class="mb-3">
            <label for="task-title" class="form-label">Título</label>
            <input
              type="text"
              id="task-title"
              class="form-control"
              v-model="title"
              placeholder="Ingrese el título de la tarea"
            />
          </div>
          <div class="mb-3">
            <label for="task-desc" class="form-label">Descripción</label>
            <textarea
              id="task-desc"
              class="form-control"
              v-model="description"
              rows="3"
              placeholder="Ingrese la descripción"
            ></textarea>
          </div>
          <div class="mb-3">
            <label for="task-deadline" class="form-label">Fecha y Hora Límite</label>
            <input
              type="datetime-local"
              id="task-deadline"
              class="form-control"
              v-model="deadline"
            />
          </div>
          <div class="mb-3">
            <label for="task-priority" class="form-label">Prioridad</label>
            <select
              id="task-priority"
              class="form-select"
              v-model="priority"
            >
              <option value="alta">Alta</option>
              <option value="media">Media</option>
              <option value="baja">Baja</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="task-tags" class="form-label">Etiquetas</label>
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                placeholder="Agregar etiqueta"
                v-model="customTag"
                @keyup.enter="addCustomTag"
              />
              <button class="btn btn-outline-primary" type="button" @click="addCustomTag">Agregar</button>
            </div>
            <div class="mt-2" v-if="tags.length">
              <span
                v-for="tag in tags"
                :key="tag"
                class="badge bg-primary me-1"
                style="cursor:pointer;"
                @click="removeTag(tag)"
                title="Quitar etiqueta"
              >{{ tag }} &times;</span>
            </div>
          </div>
          <div v-if="notification" class="alert alert-info mb-3">
            {{ notification }}
          </div>
          <div class="d-flex justify-content-end gap-2">
            <button type="button" class="btn btn-secondary" @click="togglePopup">Cancelar</button>
            <button type="submit" class="btn btn-primary">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.task-popup {
  z-index: 1050;
}
.popup-content {
  max-width: 500px;
  width: 100%;
}
</style>
