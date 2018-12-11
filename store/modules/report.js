import Vue from 'vue'
import { forEach } from 'lodash-es'

const namespaced = true

const state = {
  reports: [],
  myReports: [],
  reportRanking: [],
  pagination: {
    page: 1,
    last_page: 1
  },
  myPagination: {
    page: 1,
    last_page: 1
  },
  isGoNextPage: true,
  isMyGoNextPage: true,
  isLoading: false
}

const getters = {
  reports: state => {
    return state.reports
  },
  myReports: state => {
    return state.myReports
  },
  reportRanking: state => {
    return state.reportRanking
  },
  pagination: state => {
    return state.pagination
  },
  myPagination: state => {
    return state.myPagination
  },
  isGoNextPage: state => {
    return state.isGoNextPage
  },
  isMyGoNextPage: state => {
    return state.isMyGoNextPage
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
        const reports = await this.$axios.get(`/api/report?page=${queryParams}`)
        const reportRanking = await this.$axios.get('/api/report/ranking')
        commit('fetchReports', reports.data.data)
        commit('fetchPagination', reports.data)
        commit('fetchReportRanking', reportRanking.data)
      }
      return
    } catch (err) {
      console.error(err)
    } finally {
      commit('toggleLoading')
    }
  },
  async fetchMyReports({ state, commit }) {
    try {
      commit('toggleLoading')
      if (state.isMyGoNextPage) {
        const queryParams = state.myPagination.page
        const reports = await this.$axios.get(
          `/api/my-report?page=${queryParams}`
        )
        const reportRanking = await this.$axios.get('/api/report/ranking')
        commit('fetchMyReports', reports.data.data)
        commit('fetchMyPagination', reports.data)
        commit('fetchReportRanking', reportRanking.data)
      }
      return
    } catch (err) {
      console.error(err)
    } finally {
      commit('toggleLoading')
    }
  },
  async createReport({ commit }, formData) {
    const res = await this.$axios.post('/api/report', formData)
    commit('addReports', res.data)
    commit('addMyReports', res.data)
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
  fetchReports(state, data) {
    forEach(data, (d, key) => {
      Vue.set(state.reports, key, d)
    })
  },
  fetchMyReports(state, data) {
    forEach(data, (d, key) => {
      Vue.set(state.myReports, key, d)
    })
  },
  fetchReportRanking(state, data) {
    forEach(data, (d, key) => {
      Vue.set(state.reportRanking, key, d)
    })
  },
  addReports(state, data) {
    state.reports.unshift(data)
  },
  addMyReports(state, data) {
    state.myReports.unshift(data)
  },
  fetchPagination(state, data) {
    if (data.last_page > data.current_page) {
      Vue.set(state.pagination, 'page', state.pagination.page + 1)
      Vue.set(state.pagination, 'last_page', data.last_page)
    } else {
      state.isGoNextPage = false
    }
  },
  fetchMyPagination(state, data) {
    if (data.last_page > data.current_page) {
      Vue.set(state.myPagination, 'page', state.myPagination.page + 1)
      Vue.set(state.myPagination, 'last_page', data.last_page)
    } else {
      state.isMyGoNextPage = false
    }
  },
  toggleLoading(state) {
    state.isLoading = !state.isLoading
  },
  addGoodCount(state, data) {
    state.reports.forEach((repo, key) => {
      if (repo.id === data.id) {
        Vue.set(state.reports, key, data)
      }
    })
    state.myReports.forEach((repo, key) => {
      if (repo.id === data.id) {
        Vue.set(state.myReports, key, data)
      }
    })
    state.reportRanking.forEach((repo, key) => {
      if (repo.id === data.id) {
        Vue.set(state.reportRanking, key, data)
      }
    })
  },
  deleteGoodCount(state, data) {
    state.reports.forEach((repo, key) => {
      if (repo.id === data.id) {
        Vue.set(state.reports, key, data)
      }
    })
    state.myReports.forEach((repo, key) => {
      if (repo.id === data.id) {
        Vue.set(state.myReports, key, data)
      }
    })
    state.reportRanking.forEach((repo, key) => {
      if (repo.id === data.id) {
        Vue.set(state.reportRanking, key, data)
      }
    })
  },
  clearRanking(state) {
    state.reportRanking = []
  }
}

export default {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
