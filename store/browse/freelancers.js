import { getField, updateField } from 'vuex-map-fields';

export const state = () => ({
  currentPage: 1,
  list: [],
  freelancer: {},
  filterOptions: {
    textSearch: '',
    sortBy: 'latest',
    locations: [],
    categories: [],
    languages: [],
    skills: [],
    hourlyRate: '0',
    rate: 0,
  }
});

export const getters = {
  getField,
}

export const mutations = {
  set(state, freelancers) {
    state.list = freelancers
  },
  setProject(state, freelancer) {
    state.freelancer = freelancer
  },
  setCurPage(state, currentPage) {
    state.currentPage = currentPage
  },
  updateField,
};

export const actions = {
  async get({ commit, state }, filter) {

    let url = `/api/freelancers?page=${state.currentPage}&filter=${JSON.stringify(state.filterOptions)}`
    await this.$axios.get(url)
      .then((res) => {
        if (res.status === 200) {
          commit('set', res.data.freelancers)
        }
      })
  },
  async show({ commit }, params) {
    await this.$axios.get(`/api/freelancers/${params.slug}`)
      .then((res) => {
        if (res.status === 200) {
          commit('mergeProject', res.data.freelancer)
        }
      })
      .catch((err) => {
        console.error(err.response.data.error);
      })
  },
  async set({ commit }, freelancers) {
    await commit('set', freelancers)
  },
};
