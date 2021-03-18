import merge from "lodash.merge";
import assign from 'lodash.assign';

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
  async get({ commit }) {
    await this.$axios.get(`/api/skills`)
      .then((res) => {
        if (res.status === 200) {
          commit('set', res.data.skills)
        }
      })
  },
};
