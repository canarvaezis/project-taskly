<script setup lang="ts">
import { ref } from 'vue';
import { sendPasswordReset } from '@/services/authService';
import { useRouter } from 'vue-router';

const email = ref('');
const message = ref('');
const error = ref('');
const router = useRouter();

const handlePasswordRecovery = async () => {
  const response = await sendPasswordReset(email.value);
  if (response.success) {
    message.value = response.message;
    error.value = '';
  } else {
    error.value = response.message;
    message.value = '';
  }
};

const redirectToLogin = () => {
  router.push('/login');
};
</script>

<template>
  <div class="password-recovery">
    <h1>Recuperar Contraseña</h1>
    <form @submit.prevent="handlePasswordRecovery">
      <div class="mb-3">
        <label for="email" class="form-label">Correo Electrónico</label>
        <input
          type="email"
          id="email"
          v-model="email"
          class="form-control"
          placeholder="Ingresa tu correo"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Enviar Correo de Recuperación</button>
    </form>
    <p v-if="message" class="text-success mt-3">{{ message }}</p>
    <p v-if="error" class="text-danger mt-3">{{ error }}</p>
    <button @click="redirectToLogin" class="btn btn-link mt-3">Volver al Login</button>
  </div>
</template>
