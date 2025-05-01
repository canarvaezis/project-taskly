<template>
  <form @submit.prevent="handleLogin" class="login-form p-4 border rounded">
    <div class="mb-3">
      <label for="email" class="form-label">Correo electrónico</label>
      <input
        type="email"
        id="email"
        v-model="email"
        class="form-control"
        required
      />
    </div>
    <div class="mb-3">
      <label for="password" class="form-label">Contraseña</label>
      <input
        type="password"
        id="password"
        v-model="password"
        class="form-control"
        required
      />
    </div>
    <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
    <button type="submit" class="btn btn-primary w-100" :disabled="loading">
      {{ loading ? 'Cargando...' : 'Iniciar sesión' }}
    </button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { loginUser } from '@/services/authService';

export default defineComponent({
  name: 'LoginForm',
  setup() {
    const email = ref('');
    const password = ref('');
    const loading = ref(false);
    const errorMessage = ref('');
    const router = useRouter();

    const handleLogin = async () => {
      loading.value = true;
      errorMessage.value = '';
      try {
        const response = await loginUser(email.value, password.value);
        if (response.success) {
          console.log('Authenticated user:', response.user);
          router.push(`/main/${response.user?.uid}`); // Redirect using Firebase user ID
        } else {
          errorMessage.value = response.message;
        }
      } catch (error) {
        console.error('Login error:', error);
        errorMessage.value = 'Error al iniciar sesión. Inténtelo de nuevo.';
      } finally {
        loading.value = false;
      }
    };

    return {
      email,
      password,
      loading,
      errorMessage,
      handleLogin,
    };
  },
});
</script>

<style scoped>
.login-form {
  max-width: 400px;
  width: 100%;
}
</style>
