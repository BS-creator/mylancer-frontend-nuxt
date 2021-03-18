import merge from "lodash.merge";
import assign from 'lodash.assign';

export const state = () => ({
  list: [],
  label: {},
});

export const mutations = {
  set(state, labels) {
    state.list = labels
  },
  add(state, value) {
    merge(state.list, value)
  },
  remove(state, { label }) {
    state.list = state.list.filter(p => label.id !== p.id)
  },
  setLabel(state, label) {
    assign(state.label, label)
  },
};

export const actions = {
  async get({ commit }, project_slug) {
    let url = `/api/issues-label?project_slug=${project_slug}`
    await this.$axios.get(url)
      .then((res) => {
        if (res.status === 200) {
          commit('set', res.data.labels)
        }
      })
  },
  async setLabel({ commit }, label) {
    await commit('setLabel', label)
  },
  async add({ commit }, label) {
    await commit('add', label)
  },
  create({ commit }, label) {
    return this.$axios.post(`/api/issues-label`, label)
  },
  update({ commit }, label) {
    return this.$axios.put(`/api/issues-label/${label.id}`, label)
  },
  delete({ commit }, params) {
    return this.$axios.delete(`/api/issues-label/${params.id}`)
  }
};
