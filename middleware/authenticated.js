import { includes } from 'lodash-es'

export default async ({ store, app, route, redirect }) => {
  if (!store.getters['auth/accessToken']) {
    const next = encodeURIComponent(route.fullPath)
    return redirect(`/login?next=${next}`)
  }

  app.$axios.setToken(store.getters['auth/accessToken'], 'Bearer')

  const hasTokenExpired = await store.dispatch('auth/hasTokenExpired')
  if (hasTokenExpired) {
    try {
      await store.dispatch('auth/refreshAccessToken')
    } catch (e) {
      const next = encodeURIComponent(route.fullPath)
      return redirect(`/login?next=${next}`)
    }
    app.$axios.setToken(store.getters['auth/accessToken'], 'Bearer')
  }

  if (!store.getters['user/user']) {
    await store.dispatch('user/fetch')
  }

  // 無料版のみ下記のページ以外にアクセスしたら/talentに戻るように
  const complimentaryRoutes = [
    'talent',
    'agent',
    'organization-edit',
    'agent-id-edit',
    'private-entry'
  ]
}
