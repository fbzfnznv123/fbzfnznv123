// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'

import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Member from '@/views/Member.vue'
import CrossBorder from '@/views/CrossBorder.vue'
import BlogList from '@/views/BlogList.vue'
import BlogDetail from '@/views/BlogDetail.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', component: Home },
      { path: 'about', component: About },
      { path: 'member', component: Member },
      { path: 'cross-border', component: CrossBorder },
      { path: 'blog-list', component: BlogList },
      { path: 'blog/:id', component: BlogDetail }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
