import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

import FileView from './components/FileView.vue'
import DocumentView from './components/DocumentView.vue'

const routes = [
  { path: '/human-assisted-translation/', component: FileView },
  { path: '/human-assisted-translation/document', component: DocumentView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.mount('#app')
