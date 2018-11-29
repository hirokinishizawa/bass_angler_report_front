import {
  getAuthDataFromCookie,
  getAuthDataFromLocalStorage
} from '~/utils/auth'

export default function({ store, req }) {
  // If nuxt generate, pass this middleware
  const isServer = process.server
  if (isServer && !req) return
  const authData = isServer
    ? getAuthDataFromCookie(req)
    : getAuthDataFromLocalStorage()
  if (authData) {
    store.commit('auth/addToken', {
      token: authData.accessToken
    })
  }
}
