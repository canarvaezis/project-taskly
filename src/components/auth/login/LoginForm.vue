<template>
  <form @submit.prevent="handleLogin" class="login-form p-4 border rounded">
    <div class="mb-3">
      <label for="username" class="form-label">Nombre de usuario</label>
      <input
        type="text"
        id="username"
        v-model="username"
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
    <button type="submit" class="btn btn-primary w-100">Iniciar sesión</button>
  </form>
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
      console.log('Nombre de usuario:', username.value);
      console.log('Contraseña:', password.value);

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
