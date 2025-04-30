import { createRouter, createWebHistory } from 'vue-router'
import mainView from '../views/TaskView.vue'
import loginView from '../views/LoginView.vue'
import registerView from '../views/RegisterView.vue'

const router = createRouter({
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
  ],
})

export default router
