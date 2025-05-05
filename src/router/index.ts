import { createRouter, createWebHistory } from 'vue-router'
<<<<<<< HEAD
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import HomeView from '../views/HomeView.vue'
=======
import mainView from '../views/TaskView.vue'
import loginView from '../views/LoginView.vue'
import registerView from '../views/RegisterView.vue'
import passwordRecoveryView from '../views/PasswordRecoveryView.vue'
>>>>>>> 6994287ac2c65c4d3dae30f45365eddd5ac047f0

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
  { path: '/home', component: HomeView },
]

const router = createRouter({
<<<<<<< HEAD
  history: createWebHistory(),
  routes,
})

// 🛡 Proteger ruta
router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register']
  const authRequired = !publicPages.includes(to.path)
  const user = localStorage.getItem('user')

  if (authRequired && !user) {
    return next('/login')
  }

  next()
=======
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/main/:userId',
      name: 'main',
      component: mainView,
    },
    {
      path: '/login',
      name: 'login',
      component: loginView,
    },
    {
      path: '/register',
      name: 'register',
      component: registerView,
    },
    {
      path: '/password-recovery',
      name: 'passwordRecovery',
      component: passwordRecoveryView,
    },
  ],
>>>>>>> 6994287ac2c65c4d3dae30f45365eddd5ac047f0
})

export default router
