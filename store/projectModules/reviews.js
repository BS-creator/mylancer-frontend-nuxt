export const state = () => ({
  reviewsByUser: [],
  reviewsByProject: [],
  providedReview: false, // for one project
});

export const mutations = {
  setByUser(state, reviews) {
    state.reviewsByUser = reviews
  },
  setByProject(state, reviews) {
    state.reviewsByProject = reviews
  },
  setProvidedReview(state, provided) {
    state.providedReview = provided
  },
};

export const actions = {
  async getByUser({ commit }) {
    await this.$axios.get(`/api/reviews`)
      .then((res) => {
        if (res.status === 200) {
          commit('setByUser', res.data.reviews)
        }
      })
  },
  async getByProject({ commit }, { slug, isClient }) {
    await this.$axios.get(`/api/reviews/by-project/${slug}?isclient=${isClient}`)
      .then((res) => {
        if (res.status === 200) {
          commit('setByProject', res.data.reviews)
          commit('setProvidedReview', res.data.providedReview)
        }
      })
  },
  create({ commit }, review) {
    return this.$axios.post(`/api/reviews`, review)
  },
};
