export const state = () => ({
  list: [],
  category: {},
});

export const mutations = {
  set(state, categories) {
    state.list = categories
  },
};

export const actions = {
  async get({ commit }) {
    await this.$axios.get(`/api/categories`)
      .then((res) => {
        if (res.status === 200) {
          commit('set', res.data.categories)
        }
      })
  },
};
