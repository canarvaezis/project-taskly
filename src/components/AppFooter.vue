<template>
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
.btn-link {
  color: #908df3 !important;
  font-weight: 500;
  flex: 1;
  text-align: center;
  padding: 0.5rem;
  font-size: 0.76rem;
}

.btn-link i {
  font-size: 1rem;
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
