import merge from "lodash.merge";
import assign from 'lodash.assign';
import { getField, updateField } from 'vuex-map-fields';

export const state = () => ({
  // BEGIN the page creating freelancer
  newStep: 0,
  languages: [],
  skills: [],
  skill_ids: [],
  data: {},
  basic: {},
  // END the page creating freelancer

  // BEGIN profile page
  pageDetail: {
    headline: 'Not Provided Yet',
    summary: `Not Provided Yet`,
    hourly_rate: 'NaN',
  },
  // END profile page

});

export const getters = {
  getField,
}

export const mutations = {
  // BEGIN the page creating freelancer
  setNewStep(state, step) {
    state.newStep = step
  },
  setLanguages(state, languages) {
    state.languages = languages
  },
  setSkills(state, skills) {
    state.skills = skills
  },
  setSkillIds(state, skill_ids) {
    state.skill_ids = skill_ids
  },
  setProfile(state, profile) {
    assign(state.data, profile)
  },
  setBasic(state, basic) {
    assign(state.basic, basic)
  },
  // END the page creating freelancer
  // BEGIN profile page
  setPageDetail(state, pageDetail) {
    // assign(state.pageDetail, pageDetail)
    state.pageDetail = pageDetail
  },
  // END profile page

  // mapFields
  updateField,

};

export const actions = {
  // BEGIN the page creating freelancer
  setNewStep({ commit }, step) {
    commit('setNewStep', step)
  },
  setSkills({ commit }, { skills }) {
    return this.$axios.post(`/api/profile/set-skills`, { skills })
  },
  async getLanguages({ commit }) {
    await this.$axios.get(`/api/languages`)
      .then((res) => {
        if (res.status === 200) {
          commit('setLanguages', res.data.languages)
        }
      })
  },
  async getSkills({ commit }) {
    await this.$axios.get(`/api/profile/get-skills`)
      .then((res) => {
        if (res.status === 200) {
          commit('setSkills', res.data.skills)
          commit('setSkillIds', res.data.skill_ids)
        }
      })
  },
  async getBasic({ commit }) {
    await this.$axios.get(`/api/profile/get-basic`)
      .then((res) => {
        if (res.status === 200) {
          commit('setBasic', res.data)
        }
      })
      .catch((err) => {
        console.error(err.response);
      })
  },
  async show({ commit }, { username }) {
    await this.$axios.get(`/api/profiles/${username}`)
      .then((res) => {
        if (res.status === 200) {
          // if (res.data.profile == 'not found') {
          //   this.app.router.push('/browse/freelancers')
          //   return;
          // }
          commit('setProfile', res.data.profile)
        }
      })
      .catch((err) => {
        // console.error(err.response.status + " " + err.response.statusText);
      })
  },
  update({ commit }, { profile, user_id }) {
    return this.$axios.put(`/api/profiles/${user_id}`, profile)
  },
  uploadAvatar({ commit }, avatar) {
    return this.$axios.post(`/api/profile/upload-avatar`, avatar, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  // END the page creating freelancer

  // BEGIN profile page
  async getPageDetail({ commit, state }, { username }) {
    await this.$axios.get(`/api/profile/details/${username}/get`)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.pageDetail) {
            commit('setPageDetail', res.data.pageDetail)

          }
        }
      })
      .catch(err => {
        // this.app.router.push('/browse/freelancers')
      })
  },
  setPageDetail({ commit, state }, { username }) {
    this.$axios.post(`/api/profile/details/${username}/set`, state.pageDetail)
  },
  // END profile page

};
