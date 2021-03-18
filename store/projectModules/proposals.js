import merge from "lodash.merge";
import assign from 'lodash.assign';

export const state = () => ({
  list: [],
  awarded: [],
  accepted: [],
  proposal: {},
});

export const mutations = {
  set(state, proposals) {
    state.list = proposals
  },
  setAwarded(state, awarded) {
    state.awarded = awarded
  },
  setAccepted(state, accepted) {
    state.accepted = accepted
  },
  add(state, value) {
    merge(state.list, value)
  },
  remove(state, { proposal }) {
    state.list = state.list.filter(p => proposal.id !== p.id)
  },
  mergeproposal(state, proposal) {
    assign(state.proposal, proposal)
  },
  setproposal(state, proposal) {
    state.proposal = proposal
  }
};

export const actions = {
  async get({ commit }, { slug, current_page }) {
    await this.$axios.get(`/api/proposals?page=${current_page}&project_slug=${slug}`)
      .then((res) => {
        if (res.status === 200) {
          commit('set', { ...res.data.proposals, average_bid_amount: res.data.average_bid_amount })
          commit('setAwarded', res.data.awarded)
          commit('setAccepted', res.data.accepted)
        }
      })
  },
  async show({ commit }, params) {
    await this.$axios.get(`/api/proposals/${params.slug}`)
      .then((res) => {
        if (res.status === 200) {
          commit('mergeproposal', res.data)
        }
      })
      .catch((err) => {
        console.error(err.response.data.error);
      })

  },
  async set({ commit }, proposals) {
    await commit('set', proposals)
  },
  async form({ commit }, form) {
    await commit('mergeproposal', form)
  },
  async add({ commit }, proposal) {
    await commit('add', proposal)
  },
  create({ commit }, proposal) {
    return this.$axios.post(`/api/proposals`, proposal)
  },
  update({ commit }, proposal) {
    return this.$axios.put(`/api/proposal/${params.id}`, proposal)
  },
  delete({ commit }, params) {
    return this.$axios.delete(`/api/proposal/${params.id}`)
  },
  award({ commit }, { id }) {
    return this.$axios.post(`/api/proposals/award/${id}`)
  },
  retract({ commit }, { id }) {
    return this.$axios.post(`/api/proposals/retract/${id}`)
  },
  revoke({ commit }, { id }) {
    return this.$axios.post(`/api/proposals/revoke/${id}`)
  },
  accept({ commit }, { id }) {
    return this.$axios.post(`/api/proposals/accept/${id}`)
  },
};
