<template>
  <div class="login-view d-flex align-items-center justify-content-center">
    <div class="login-container">
      <h1 class="mb-4 text-center">Login</h1>
      <LoginForm />
      <p class="mt-3 text-center">
        ¿No tienes una cuenta?
        <router-link to="/register">Regístrate aquí</router-link>
      </p>
      <div class="mt-3">
        <router-link to="/password-recovery" class="btn btn-link">¿Olvidaste tu contraseña?</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LoginForm from '../components/auth/login/LoginForm.vue';

export default defineComponent({
  name: 'LoginView',
  components: {
    LoginForm,
  },
});
</script>

<style scoped>
.login-container {
  padding: 2rem;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
}
</style>
