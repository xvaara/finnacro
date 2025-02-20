import type { RouterScrollBehavior } from 'vue-router'
import type { UserModule } from './types'
import { setupLayouts } from 'virtual:generated-layouts'
import { ViteSSG } from 'vite-ssg'
import { routes } from 'vue-router/auto-routes'

// import Previewer from 'virtual:vue-component-preview'
import App from './App.vue'

import 'bootstrap-styles/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import './styles/main.scss'

const scrollBehavior: RouterScrollBehavior = (to, from, savedPosition) => {
  if (to.hash) {
    return {
      el: decodeURIComponent(to.hash),
      top: 80,
      behavior: 'smooth',
    }
  }
  else {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (savedPosition)
          resolve(savedPosition)
        else
          resolve({ left: 0, top: 0 })
      }, 300)
    })
  }
}

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  { routes: setupLayouts(routes), scrollBehavior, base: import.meta.env.BASE_URL },
  (ctx) => {
    // install all modules under `modules/`
    Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
      .forEach(i => i.install?.(ctx))
    // ctx.app.use(Previewer)
  },
)
