import Vue from 'vue'
import { forEach } from 'lodash-es'

const namespaced = true

const state = {
  reports: [],
  pagination: {
    page: 1,
    last_page: 1
  },
  isGoNextPage: true,
  isLoading: false
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
  },
  isLoading: state => {
    return state.isLoading
  }
}

const actions = {
  async fetchReports({ state, commit }) {
    try {
      commit('toggleLoading')
      if (state.isGoNextPage) {
        const queryParams = state.pagination.page
        const res = await this.$axios.get(`/api/report?page=${queryParams}`)
        commit('addReports', res.data.data)
        commit('fetchPagination', res.data.meta)
      }
      return
    } catch (err) {
      console.error(err)
    } finally {
      commit('toggleLoading')
    }
  },
  async createReport({ commit }, formData) {
    const data = await this.$axios.post('/api/report', formData)
    commit('addReports', [data.data])
  },
  async addReportGood({ commit }, reportId) {
    const res = await this.$axios.post(`/api/report/${reportId}/good`)
    commit('addGoodCount', res.data)
  },
  async deleteReportGood({ commit }, data) {
    const res = await this.$axios.post(
      `/api/report/${data.report_id}/good/${data.id}`
    )
    commit('deleteGoodCount', res.data)
  }
}

const mutations = {
  addReports(state, data) {
    forEach(data, d => {
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
  },
  toggleLoading(state) {
    state.isLoading = !state.isLoading
  },
  addGoodCount(state, data) {
    state.reports.forEach((repo, key) => {
      if (repo.report.id === data.report.id) {
        Vue.set(state.reports, key, data)
      }
    })
  },
  deleteGoodCount(state, data) {
    state.reports.forEach((repo, key) => {
      if (repo.report.id === data.id) {
        Vue.set(state.reports[key], 'report', data)
        Vue.set(state.reports[key], 'good', null)
      }
    })
  }
}

export default {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
