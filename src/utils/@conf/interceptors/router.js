export const routerBeforeEach = (to, from, next) => {
  document.title = to.meta.title || ''
  if (to.matched.some(record => record.meta.requireAuth)) {
    next()
  } else {
    next()
  }
}
