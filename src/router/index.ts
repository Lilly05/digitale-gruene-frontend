import { createRouter, createWebHistory } from 'vue-router'
import SignUpView from "@/views/SignUpView.vue";
import ConfirmationView from "@/views/ConfirmationView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/anmelden'
    },
    {
      path: '/anmelden',
      name: 'SignUp',
      component: SignUpView
    },
    {
      path: '/confirmation',
      name: 'Confirmation',
      component: ConfirmationView
    }
  ]
})

export default router
