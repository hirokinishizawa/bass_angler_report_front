import Vuex from 'vuex'
// import app from './modules/app'
import auth from './modules/auth'
import user from './modules/user'
import report from './modules/report'

const store = () =>
  new Vuex.Store({
    modules: {
      // app,
      auth,
      user,
      report
    },
    strict: false,
    plugins: []
  })

export default store
