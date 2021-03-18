import merge from "lodash.merge";
import assign from 'lodash.assign';

export const state = () => ({
  list: [],
  issue: {},
  project_id: 0,
});

export const mutations = {
  set(state, issues) {
    state.list = issues
  },
  setProjId(state, issues) {
    state.project_id = issues
  },
  assginIssue(state, issue) {
    assign(state.issue, issue)
  },
};

export const actions = {
  async get({ commit }, params) {
    await this.$axios.get(`/api/issues?project_slug=${params.slug}`)
      .then((res) => {
        if (res.status === 200) {
          commit('set', res.data.issues)
          commit('setProjId', res.data.project_id)
        }
      })
  },
  async show({ commit }, id) {
    await this.$axios.get(`/api/issues/${id}`)
      .then((res) => {
        if (res.status === 200) {
          commit('assginIssue', res.data)
        }
      })
      .catch((err) => {
        console.error(err.response.data.error);
      })
  },
  create({ commit }, issue) {
    return this.$axios.post(`/api/issues`, issue)
  },
  createComment({ commit }, comment) {
    return this.$axios.post(`/api/issues-comment`, comment)
  },
  closeIssue({ commit }, issue) {
    return this.$axios.post(`/api/issues/close`, issue)
  },
  reopenIssue({ commit }, issue) {
    return this.$axios.post(`/api/issues/reopen-issue`, issue)
  },
  delete({ commit }, issue_id) {
    return this.$axios.delete(`/api/issues/${issue_id}`)
  },
};
