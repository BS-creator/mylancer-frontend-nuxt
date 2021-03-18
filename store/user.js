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
  register({ commit }, user) {
    return this.$axios.post(`/api/auth/register`, user)
  },
  checkEmail({ commit }, email) {
    return this.$axios.get(`/api/auth/check-email/${email}`)
  },
  checkUsername({ commit }, username) {
    return this.$axios.get(`/api/auth/check-username/${username}`)
  },
};
