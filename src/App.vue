<script setup lang="ts">
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import TaskList from './components/TaskList.vue';
</script>

<template>
  <header class="fixed-top bg-white shadow-sm">
    <div class="container">
      <div class="header-top d-flex align-items-center">
        <img alt="Vue logo" class="logo me-3" src="@/assets/logo.svg" width="50" height="50" />
        <h1 class="title mb-0">Taskly</h1>
      </div>
    </div>
  </header>

  <main class="mt-5 pt-5 pb-5">
    <TaskList />
  </main>

  <footer class="fixed-bottom bg-white shadow-sm">
    <div class="container">
      <div class="d-flex justify-content-between align-items-center py-3">
        <button class="btn btn-link text-decoration-none">
          <i class="bi bi-list-check me-2"></i>Ver Todos
        </button>
        <div class="divider"></div>
        <button class="btn btn-link text-decoration-none">
          <i class="bi bi-star me-2"></i>Favoritos
        </button>
        <div class="divider"></div>
        <button class="btn btn-link text-decoration-none">
          <i class="bi bi-gear me-2"></i>Configuraciones
        </button>
      </div>
    </div>
  </footer>
</template>

<style scoped>
header {
  padding: 0.5rem 0;
}

.logo {
  width: 50px;
  height: 50px;
}

.title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
}

main {
  min-height: calc(100vh - 140px);
  padding-bottom: 70px;
}

.btn-link {
  color: #908df3 !important;
  font-weight: 500;
  flex: 1;
  text-align: center;
  padding: 0.5rem;
}

.btn-link:hover {
  color: #716bee !important;
  transform: translateY(-1px);
}

.divider {
  width: 2px;
  height: 24px;
  background-color: #e9ecef;
}
</style>
