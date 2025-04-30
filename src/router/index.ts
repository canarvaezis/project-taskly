import { createRouter, createWebHistory } from 'vue-router'
import mainView from '../views/TaskView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/main/:userId',
      name: 'main',
      component: mainView,
    },
  ],
})

export default router
