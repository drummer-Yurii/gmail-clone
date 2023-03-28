import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MessageView from '../views/MessageView.vue'
import LoginView from '../views/LoginView.vue'
import EmailView from '../views/template/EmailView.vue'

const routes = [
  {
    path: '/',
    component: LoginView
  },
  {
    path: '/email',
    component: EmailView,
    children: [
      {
        path: '',
        component: HomeView
      },
      {
        path: 'message',
        component: MessageView
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
