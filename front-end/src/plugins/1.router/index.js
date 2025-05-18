import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router/auto'
import { isUserLoggedIn } from './utils'

function recursiveLayouts(route) {
  if (route.children) {
    for (let i = 0; i < route.children.length; i++)
      route.children[i] = recursiveLayouts(route.children[i])
    
    return route
  }
  
  return setupLayouts([route])[0]
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to) {
    if (to.hash)
      return { el: to.hash, behavior: 'smooth', top: 60 }
    
    return { top: 0 }
  },
  extendRoutes: pages => [
    ...[...pages].map(route => recursiveLayouts(route)),
  ],
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = isUserLoggedIn()

  if (isLoggedIn) {
    if (to.name === 'login') next({ path: '/' })
    else next()
  } else {
    if (to.name === 'login') next()
    else next({ name: 'login' })
  } 
})

export { router }
export default function (app) {
  app.use(router)
}
