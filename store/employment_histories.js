export const state = () => ({
  list: [],
  history: {},
});

export const mutations = {
  set(state, histories) {
    state.list = histories
  },
  add(state, value) {
    state.list = [...state.list, value]
  },
};

export const actions = {
  async get({ commit }) {
    await this.$axios.get(`/api/profile/employment-history`)
      .then((res) => {
        if (res.status === 200) {
          commit('set', res.data.histories)
        }
      })
  },
  async add({ commit }, history) {
    await commit('add', history)
  },
  create({ commit }, history) {
    return this.$axios.post(`/api/profile/employment-history`, history)
  },
  update({ commit }, history) {
    return this.$axios.put(`/api/profile/employment-history/${history.id}`, history)
  },
  delete({ commit }, history_id) {
    return this.$axios.delete(`/api/profile/employment-history/${history_id}`)
  },
};
