export const delay = (fn = () => {}) =>
  new Promise(res =>
    setTimeout(() => {
      fn()
      res()
    }, 0),
  )