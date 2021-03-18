export const state = () => ({
  list: [],
  skill: {},
});

export const mutations = {
  set(state, skills) {
    state.list = skills
  },
};

export const actions = {
  deposit({ commit }, params) {
    return this.$axios.post(`/api/payments/deposit`, params)
  },
};
