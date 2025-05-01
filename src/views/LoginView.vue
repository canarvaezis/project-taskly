<template>
    <div class="login-container">
      <form class="login-form" @submit.prevent="handleLogin">
        <h2>Iniciar Sesión</h2>
        <input v-model="email" type="email" placeholder="Correo electrónico" required />
        <input v-model="password" type="password" placeholder="Contraseña" required />
        <button type="submit">Entrar</button>
        <router-link to="/register" class="link">¿No tienes cuenta? Regístrate</router-link>
  
        <p v-if="loginSuccess" class="message success">¡Login exitoso!</p>
        <p v-if="loginError" class="message error">Credenciales incorrectas</p>
      </form>
    </div>
  </template>
  
  <script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const loginSuccess = ref(false)
const loginError = ref(false)

const router = useRouter()

function handleLogin() {
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    const user = JSON.parse(storedUser)
    if (user.email === email.value && user.password === password.value) {
      loginSuccess.value = true
      loginError.value = false

      // ✅ Redirigir al home
      setTimeout(() => {
        router.push('/home')
      }, 1000) // pequeña pausa para que vea el mensaje

    } else {
      loginSuccess.value = false
      loginError.value = true
    }
  } else {
    loginSuccess.value = false
    loginError.value = true
  }
}
</script>

  
  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #2c3e50, #4ca1af);
  }
  
  .login-form {
    background-color: #ffffff;
    padding: 40px 30px;
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    width: 320px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .login-form h2 {
    text-align: center;
    margin-bottom: 10px;
    color: #2c3e50;
  }
  
  .login-form input {
    padding: 12px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
    outline: none;
    transition: border-color 0.3s;
  }
  
  .login-form input:focus {
    border-color: #4ca1af;
  }
  
  .login-form button {
    padding: 12px;
    font-size: 16px;
    background-color: #4ca1af;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .login-form button:hover {
    background-color: #398b98;
  }
  
  .link {
    text-align: center;
    font-size: 14px;
    color: #4ca1af;
    text-decoration: none;
    margin-top: -10px;
  }
  
  .link:hover {
    text-decoration: underline;
  }
  
  .message {
    text-align: center;
    font-weight: bold;
  }
  
  .success {
    color: #2ecc71;
  }
  
  .error {
    color: #e74c3c;
  }
  </style>
  