export const state = () => ({
  list: [],
  milestone: {},
  inProgressSum: 0,
  releasedSum: 0,
});

export const mutations = {
  set(state, data) {
    state.list = data.milestones
    state.inProgressSum = data.in_progress_sum
    state.releasedSum = data.released_sum
  },
};

export const actions = {
  async get({ commit }, slug) {
    await this.$axios.get(`/api/milestones?project_slug=${slug}`)
      .then((res) => {
        if (res.status === 200) {
          commit('set', res.data)
        }
      })
  },
  create({ commit }, milestone) {
    return this.$axios.post(`/api/milestones`, milestone)
  },
  release({ commit }, milestone_id) {
    return this.$axios.post(`/api/milestones/release/${milestone_id}`, milestone_id)
  },
  cancel({ commit }, milestone_id) {
    return this.$axios.post(`/api/milestones/cancel/${milestone_id}`, milestone_id)
  },
  cancel_request({ commit }, milestone_id) {
    return this.$axios.post(`/api/milestones/cancel-request/${milestone_id}`, milestone_id)
  },
  cancel_approve({ commit }, milestone_id) {
    return this.$axios.post(`/api/milestones/cancel-approve/${milestone_id}`, milestone_id)
  },
  cancel_deny({ commit }, milestone_id) {
    return this.$axios.post(`/api/milestones/cancel-deny/${milestone_id}`, milestone_id)
  },
  restore({ commit }, milestone_id) {
    return this.$axios.post(`/api/milestones/restore/${milestone_id}`, milestone_id)
  },
};
