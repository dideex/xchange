import Cookie from 'js-cookie'

export const setToken = (token, isAdmin) => {
  if (isAdmin) {
    Cookie.set('key', token)
    Cookie.set('isAdmin', true)
  } else Cookie.set('key', token)
}

export const logout = () => {
  Cookie.remove('key')
  Cookie.remove('isAdmin')
}

export const getToken = () => Cookie.get('key') || null
export const getAdminStatus = () => Cookie.get('isAdmin') || null
