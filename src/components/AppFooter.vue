<template>
  <footer class="fixed-bottom bg-white shadow-sm">
    <div class="container">
      <div class="d-flex justify-content-center align-items-center py-3">
        <button class="btn btn-link text-decoration-none" @click="logout">
          <i class="bi bi-box-arrow-right me-2"></i>Cerrar sesión
        </button>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
function logout() {
  router.push({ name: 'login' })
}
</script>

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
</style>
