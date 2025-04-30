<template>
  <form @submit.prevent="onSubmit" class="register-form p-4 border rounded bg-white">
    <div class="mb-3">
      <label for="username" class="form-label">Nombre de usuario</label>
      <input
        type="text"
        id="username"
        v-model="form.username"
        class="form-control"
        required
      />
    </div>
    <div class="mb-3">
      <label for="email" class="form-label">Correo</label>
      <input
        type="email"
        id="email"
        v-model="form.email"
        class="form-control"
        required
      />
    </div>
    <div class="mb-3">
      <label for="password" class="form-label">Contraseña</label>
      <input
        type="password"
        id="password"
        v-model="form.password"
        class="form-control"
        required
      />
    </div>
    <div class="mb-3">
      <label for="confirmPassword" class="form-label">Confirmar contraseña</label>
      <input
        type="password"
        id="confirmPassword"
        v-model="form.confirmPassword"
        class="form-control"
        required
      />
    </div>
    <button type="submit" class="btn btn-primary w-100">Registrarse</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'RegisterForm',
  setup() {
    const form = reactive({
      username: '',
      email: '', // Changed from 'name' to 'email'
      password: '',
      confirmPassword: '',
    });
    const router = useRouter();

    const onSubmit = () => {
      if (form.password !== form.confirmPassword) {
        alert('¡Las contraseñas no coinciden!');
        return;
      }
      console.log('Formulario enviado:', form);

      // Simular registro exitoso y redirigir al login
      router.push('/login');
    };

    return {
      form,
      onSubmit,
    };
  },
});
</script>

<style scoped>
.register-form {
  max-width: 400px;
  width: 100%;
}
</style>
