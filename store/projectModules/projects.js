import merge from "lodash.merge";
import assign from 'lodash.assign';
import { getField, updateField } from 'vuex-map-fields';
const localStorageFilterOptions = process.client ? localStorage.getItem('mylancer.project.filterOptions') : null

export const state = () => ({
  currentPage: 1,
  list: [],
  project: {},
  activePageTab: '/details',
  filterOptions: localStorageFilterOptions ? JSON.parse(localStorageFilterOptions) : {
    textSearch: '',
    sortBy: 'latest',
    locations: [],
    categories: [],
    skills: [],
    fixedPrice: [1, 10000],
    hourlyPrice: [1, 300],
  }
});

export const getters = {
  getField,
}

export const mutations = {
  set(state, projects) {
    state.list = projects
  },
  add(state, value) {
    merge(state.list, value)
  },
  remove(state, { project }) {
    state.list = state.list.filter(p => project.id !== p.id)
  },
  mergeProject(state, project) {
    assign(state.project, project)
  },
  setActivePageTab(state, activePageTab) {
    state.activePageTab = activePageTab
  },
  setProject(state, project) {
    state.project = project
  },
  setCurPage(state, currentPage) {
    state.currentPage = currentPage
  },
  setFilter(state, filterOptions) {
    localStorage.setItem('mylancer.project.filterOptions', JSON.stringify(state.filterOptions))
    state.filterOptions = filterOptions
  },
  updateField,
};

export const actions = {
  async get({ commit, state }, filter) {
    let filterOptions = JSON.stringify(state.filterOptions)
    if (filter !== undefined) {
      filterOptions = JSON.stringify(filter)
      commit('setFilter', filter)
    }
    localStorage.setItem('mylancer.project.filterOptions', filterOptions)
    let url = `/api/projects?page=${state.currentPage}&filter=${filterOptions}`
    await this.$axios.get(url)
      .then((res) => {
        if (res.status === 200) {
          commit('set', res.data.projects)
        }
      })
  },
  async show({ commit }, params) {
    await this.$axios.get(`/api/projects/${params.slug}`)
      .then((res) => {
        if (res.status === 200) {
          commit('mergeProject', res.data.project)
        }
      })
      .catch((err) => {
        console.error(err.response.data.error);
      })
  },
  async set({ commit }, projects) {
    await commit('set', projects)
  },
  async form({ commit }, form) {
    await commit('mergeProject', form)
  },
  async add({ commit }, project) {
    await commit('add', project)
  },
  create({ commit }, project) {
    return this.$axios.post(`/api/projects`, project, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  update({ commit }, project) {
    return this.$axios.put(`/api/project/${params.id}`, project)
  },
  delete({ commit }, params) {
    return this.$axios.delete(`/api/project/${params.id}`)
  }
};
