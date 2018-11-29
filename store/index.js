import Vuex from 'vuex'
// import app from './modules/app'
import auth from './modules/auth'
import user from './modules/user'

const store = () =>
  new Vuex.Store({
    modules: {
      // app,
      auth,
      user
    },
    strict: false,
    plugins: []
  })

export default store
