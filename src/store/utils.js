import Cookie from 'js-cookie'

export const setToken = (token, isAdmin) => {
  if (isAdmin) {
    Cookie.set('token', token)
    Cookie.set('isAdmin', true)
  } else Cookie.set('token', token)
}

export const logout = () => {
  Cookie.remove('token')
  Cookie.remove('isAdmin')
}

export const getToken = () => Cookie.get('token') || null
export const getAdminStatus = () => Cookie.get('isAdmin') || null
