const pkg = require('./package')

const isDebug = () => process.env.APP_DEBUG && process.env.APP_DEBUG !== 'false'

module.exports = {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  loading: { color: '#fff' },

  css: ['element-ui/lib/theme-chalk/index.css', '~/assets/scss/app.scss'],

  router: {
    base: '/',
    middleware: ['check-auth'],
    extendRoutes(routes) {
      routes.push({
        name: 'app-root',
        path: '/',
        redirect: { name: 'home' }
      })
    },
    parseQuery(query) {
      return require('query-string').parse(query, {
        arrayFormat: 'bracket'
      })
    },
    stringifyQuery(params) {
      if (Object.keys(params).length === 0) {
        return ''
      }
      const query = require('query-string').stringify(params, {
        arrayFormat: 'bracket'
      })
      return `?${query}`
    }
  },

  plugins: ['@/plugins/element-ui'],

  modules: ['@nuxtjs/axios'],
  axios: {
    baseURL: process.env.API_ROOT || 'http://localhost:8000',
    redirectError: {
      401: '/logout'
    },
    debug: isDebug()
  },

  build: {
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
