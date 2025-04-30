<template>
  <div class="register-view d-flex align-items-center justify-content-center">
    <div class="register-container">
      <h1 class="mb-4 text-center">Register</h1>
      <RegisterForm />
      <p class="mt-3 text-center">
        ¿Ya tienes una cuenta?
        <router-link to="/login">Inicia sesión aquí</router-link>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import RegisterForm from '../components/auth/register/RegisterForm.vue';

export default defineComponent({
  name: 'RegisterView',
  components: {
    RegisterForm,
  },
});
</script>

<style scoped>
.register-view {
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%; /* Ensure it spans the full width */
  height: 100%; /* Adjust to fit within the parent container */
  margin: 0; /* Remove any default margins */
}

.register-container {
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
}
</style>
