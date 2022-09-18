import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import HelpView from '../views/HelpView.vue'
import MyProfileView from '../views/MyProfileView.vue'
import MyDriveView from '../views/MyDriveView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/drive/:userName/',
    name: 'mydrive',
    component: MyDriveView
  },
  {
    path: '/register/',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/login/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/myprofile/:userId/',
    name: 'myprofile',
    component: MyProfileView
  },
  {
    path: '/help/',
    name: 'help',
    component: HelpView
  },
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
