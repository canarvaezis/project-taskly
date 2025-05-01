import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Verificar la clave desde el frontend
const appKey = import.meta.env.VITE_APP_KEY; // Clave configurada en .env

if (appKey !== 'abc123') {
    throw new Error('Clave de aplicación inválida. No se puede iniciar la aplicación.');
}

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
