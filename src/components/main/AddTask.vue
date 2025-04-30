<script lang="ts">
import { ref, defineEmits } from 'vue';
import { saveTaskToFirestore } from '@/services/taskService';

export default {
  name: 'AddTask',
  setup() {
    const emit = defineEmits(['taskAdded']); // Define el evento 'taskAdded'
    const showPopup = ref(false);
    const title = ref('');
    const description = ref('');
    const deadline = ref('');
    const priority = ref('media');
    const notification = ref('');

    const togglePopup = () => {
      showPopup.value = !showPopup.value;
      notification.value = ''; // Clear notification when popup is toggled
    };

    const saveTask = async (e: Event) => {
      e.preventDefault();
      if (title.value.trim().length < 3) {
        notification.value = 'El título debe tener al menos 3 caracteres.';
        return;
      }

      const task = {
        id: Date.now().toString(), // Generate a unique ID
        title: title.value,
        description: description.value,
        deadline: deadline.value,
        priority: priority.value,
        isFavorite: false, // Default value for isFavorite
      };

      const result = await saveTaskToFirestore(task);
      notification.value = result.message;

      // Cierra el popup independientemente del resultado
      togglePopup();

      if (result.success) {
        emit('taskAdded'); // Emite el evento cuando se guarda la tarea
        // Reset form fields
        title.value = '';
        description.value = '';
        deadline.value = '';
        priority.value = 'media';
      }
    };

    return {
      showPopup,
      title,
      description,
      deadline,
      priority,
      notification,
      togglePopup,
      saveTask,
    };
  },
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
        <h5 class="mb-3">Crear Nueva Tarea</h5>
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
