<<<<<<< HEAD
=======
import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

>>>>>>> 6994287ac2c65c4d3dae30f45365eddd5ac047f0
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

<<<<<<< HEAD
createApp(App).use(router).mount('#app')
=======
// Verificar la clave desde el frontend
const appKey = import.meta.env.VITE_APP_KEY; // Clave configurada en .env

if (!appKey || appKey !== 'abc123') {
    console.error(`Clave de aplicación inválida o no configurada. Valor proporcionado: "${appKey || 'undefined'}"`);
    throw new Error('No se puede iniciar la aplicación debido a una clave inválida.');
}

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
>>>>>>> 6994287ac2c65c4d3dae30f45365eddd5ac047f0
