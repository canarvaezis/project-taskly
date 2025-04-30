<template>
  <form @submit.prevent="handleLogin" class="login-form p-4 border rounded bg-white">
    <div class="mb-3">
      <label for="username" class="form-label">Username</label>
      <input
        type="text"
        id="username"
        v-model="username"
        class="form-control"
        required
      />
    </div>
    <div class="mb-3">
      <label for="password" class="form-label">Password</label>
      <input
        type="password"
        id="password"
        v-model="password"
        class="form-control"
        required
      />
    </div>
    <button type="submit" class="btn btn-primary w-100">Login</button>
  </form>
  <p class="mt-3">
    Don't have an account?
    <router-link to="/register">Register here</router-link>
  </p>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'LoginForm',
  setup() {
    const username = ref('');
    const password = ref('');
    const router = useRouter();

    const handleLogin = () => {
      // Aquí puedes manejar la lógica de autenticación
      console.log('Username:', username.value);
      console.log('Password:', password.value);

      // Simular autenticación exitosa y redirigir
      const userId = username.value; // Puedes ajustar esto según tu lógica
      router.push(`/main/${userId}`);
    };

    return {
      username,
      password,
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
