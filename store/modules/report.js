import Vue from 'vue'

const namespaced = true

const state = {
  reports: [],
  pagination: {
    page: 1,
    last_page: 1
  },
  isGoNextPage: true
}

const getters = {
  reports: state => {
    return state.reports
  },
  pagination: state => {
    return state.pagination
  },
  isGoNextPage: state => {
    return state.isGoNextPage
  }
}

const actions = {
  async fetchReports({ state, commit }) {
    try {
      if (state.isGoNextPage) {
        const queryParams = state.pagination.page
        const res = await this.$axios.get(`/api/report?page=${queryParams}`)
        commit('addReports', res.data.data)
        commit('fetchPagination', res.data)
      }
      return
    } catch (err) {
      console.error(err)
    }
  }
}

const mutations = {
  addReports(state, data) {
    data.forEach(d => {
      state.reports.push(d)
    })
  },
  fetchPagination(state, data) {
    if (data.last_page > data.current_page) {
      Vue.set(state.pagination, 'page', state.pagination.page + 1)
      Vue.set(state.pagination, 'last_page', data.last_page)
    } else {
      state.isGoNextPage = false
    }
  }
}

export default {
  namespaced,
  state,
  getters,
  actions,
  mutations
}