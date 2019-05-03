export {fakeCurrnecy} from './fixtures'

export const delay = (fn = () => {}, timeout = 0) =>
  new Promise(res =>
    setTimeout(() => {
      fn()
      res()
    }, timeout),
  )
